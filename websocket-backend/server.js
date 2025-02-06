const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;
const SECRET_KEY = "your_secret_key";

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const storiesDir = path.join(__dirname, "uploads/stories/");
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

const storage_stories = multer.diskStorage({
  destination: storiesDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload_stories = multer({ storage: storage_stories });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err)
        return res.status(500).json({ error: "User registration failed" });
      res.status(200).json({ message: "User registered successfully" });
    }
  );
});

app.get("/user_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const query = `
  SELECT 
    users.id AS user_id,
    users.username,
    users.avatar,
    
    (
      SELECT content 
    FROM messages 
    WHERE ((sender_id = users.id AND receiver_id = ${userId}) 
        OR (sender_id = ${userId} AND receiver_id = users.id)) 
    AND (JSON_CONTAINS(delete_user_id, ${userId}) = 0 OR delete_user_id IS NULL) 
    ORDER BY timestamp DESC
    LIMIT 1
    ) AS last_message,
    (
        CASE
          WHEN (
            SELECT receiver_id 
            FROM messages 
            WHERE ((sender_id = users.id AND receiver_id = ${userId}) 
               OR (sender_id = ${userId} AND receiver_id = users.id))
               AND (JSON_CONTAINS(delete_user_id, ${userId}) = 0 OR delete_user_id IS NULL) 
            ORDER BY timestamp DESC 
            LIMIT 1
          ) = ${userId}
          THEN (
            SELECT status 
            FROM messages 
            WHERE sender_id = users.id 
              AND receiver_id = ${userId} 
              AND (JSON_CONTAINS(delete_user_id, ${userId}) = 0 OR delete_user_id IS NULL) 
            ORDER BY timestamp DESC 
            LIMIT 1
          )
          ELSE 'read'
        END
      ) AS last_status,
    (
      SELECT timestamp 
      FROM messages 
      WHERE ((sender_id = users.id AND receiver_id = ${userId}) 
         OR (sender_id = ${userId} AND receiver_id = users.id))
         AND (JSON_CONTAINS(delete_user_id, ${userId}) = 0 OR delete_user_id IS NULL) 
      ORDER BY timestamp DESC 
      LIMIT 1
    ) AS last_message_time,
    (
      SELECT COUNT(*) 
      FROM messages 
      WHERE receiver_id = ${userId} 
        AND sender_id = users.id 
        AND status = 'unread'
        AND (JSON_CONTAINS(delete_user_id, ${userId}) = 0 OR delete_user_id IS NULL) 
    ) AS unread_count

  FROM users
  WHERE users.id != ${userId}
  ORDER BY last_message_time DESC;
`;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve user list",
          details: err.message,
        });
      }

      res.status(200).json({ users: results });
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/chat_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    db.query(
      "SELECT * FROM messages WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)) AND (JSON_CONTAINS(delete_user_id, ?) = 0 OR delete_user_id IS NULL) ORDER BY timestamp ASC",
      [userId, receiverID, receiverID, userId, userId],
      (err, messages) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to retrieve chat messages",
            details: err.message,
          });
        }

        const sql = `
          SELECT COUNT(*) AS record_count 
  FROM stories 
  WHERE user_id = ? 
    AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
        `;
        db.query(sql, [receiverID], (err, storyResults) => {
          if (err) {
            return res.status(500).json({ error: "Database error" });
          }

          const recordCount = storyResults[0]?.record_count || 0;
          const flag = recordCount > 0;
          res.status(200).json({ messages, flag });
        });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/add_stories_list", upload_stories.any(), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const captions = req.body.captions || []; // Captions from frontend

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Validate if captions array length matches files array length
    if (captions.length !== req.files.length) {
      return res
        .status(400)
        .json({ error: "Captions count mismatch with images" });
    }

    // Prepare data for batch insert
    const imageData = req.files.map((file, index) => [
      userId,
      `/uploads/stories/${file.filename}`,
      captions[index] || "Untitled Story", // Use a default title if empty
      new Date(),
      new Date(),
    ]);

    const insertSql =
      "INSERT INTO stories (user_id, images_stories, title, created_at, updated_at) VALUES ?";

    db.query(insertSql, [imageData], (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to upload images" });
      }

      // Fetch updated stories and count
      const baseUrl = `http://localhost:3001`;

      const fetchSql = `
        SELECT 
          id,
          user_id,
          CONCAT(?, images_stories) AS images_stories,
          viewers,
          title,
          created_at
        FROM stories
        WHERE user_id = ? 
          AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
      `;

      const countSql = `
        SELECT COUNT(*) AS total_count 
        FROM stories 
        WHERE user_id = ? 
          AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
      `;

      db.query(fetchSql, [baseUrl, userId], (err, stories) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to retrieve updated stories",
            details: err.message,
          });
        }

        db.query(countSql, [userId], (err, countResult) => {
          if (err) {
            return res.status(500).json({
              error: "Failed to retrieve story count",
              details: err.message,
            });
          }

          const totalCount = countResult[0]?.total_count || 0;

          res.status(200).json({
            message: "Stories uploaded successfully",
            total_count: totalCount,
            stories: stories,
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user_receiver_list", async (req, res) => {
  try {
    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [receiverID],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to retrieve user", details: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user: results[0] }); // Return only the first record
      }
    );
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/user_profile_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [userId],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to retrieve user", details: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user: results[0] });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.put("/update_user_chat_status_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(400).json({ error: "receiverId is required" });
    }

    const updateQuery =
      "UPDATE messages SET status = ? WHERE sender_id = ? AND receiver_id = ?";

    db.query(updateQuery, ["read", receiverId, userId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to update user profile",
          details: err.message,
        });
      }
      res.status(200).json({ message: "Chat status updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/user_chat_delete_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { deleteId } = req.body;
    if (!deleteId) {
      return res.status(400).json({ error: "deleteId is required" });
    }

    const deleteQuery = "DELETE FROM messages WHERE id = ?";

    db.query(deleteQuery, [deleteId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to delete chat",
          details: err.message,
        });
      }
      res.status(200).json({ message: "Chat deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/update_user_profile_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const updateQuery = "UPDATE users SET username = ? WHERE id = ?";

    db.query(updateQuery, [username, userId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to update user profile",
          details: err.message,
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "User not found or no changes made" });
      }

      res.status(200).json({ message: "User profile updated successfully" });
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.put("/update_user_change_password_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const { old_password, new_password, confirm_password } =
      req.body.data || {};

    // Validate input
    if (!old_password || !new_password || !confirm_password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (new_password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Fetch the user's existing password
    const getPasswordQuery = "SELECT password FROM users WHERE id = ?";
    db.query(getPasswordQuery, [userId], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const storedPasswordHash = results[0].password;

      // Verify old password
      const isMatch = await bcrypt.compare(old_password, storedPasswordHash);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(new_password, 10);

      // Update the password in the database
      const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
      db.query(
        updatePasswordQuery,
        [hashedNewPassword, userId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Failed to update password" });
          }

          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ error: "User not found or no changes made" });
          }

          res.status(200).json({ message: "Password changed successfully" });
        }
      );
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/user_self_stories_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const baseUrl = `http://localhost:3001`;

    const sqlQueryStories = `
      SELECT 
        id,
        user_id,
        CONCAT(?, images_stories) AS images_stories,
        viewers,
        title,
        created_at
      FROM stories
      WHERE user_id = ? 
        AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
    `;

    const sqlQueryCount = `
      SELECT 
        COUNT(*) AS total_count 
      FROM stories
      WHERE user_id = ? 
        AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
    `;

    // Execute both queries
    db.query(sqlQueryStories, [baseUrl, userId], (err, storyResults) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve stories",
          details: err.message,
        });
      }

      db.query(sqlQueryCount, [userId], (err, countResults) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to retrieve story count",
            details: err.message,
          });
        }

        const totalCount = countResults[0]?.total_count || 0;
        res.status(200).json({ stories: storyResults, totalCount });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user_stories_list", async (req, res) => {
  try {
    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    const baseUrl = `http://localhost:3001`;

    const sqlQuery = `
      SELECT 
        id,
        user_id,
        CONCAT(?, images_stories) AS images_stories,
        viewers,
        title,
        created_at
      FROM stories
      WHERE user_id = ? 
        AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
    `;

    db.query(sqlQuery, [baseUrl, receiverID], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve stories and images",
          details: err.message,
        });
      }

      res.status(200).json({ stories: results });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get_user_stories_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const baseUrl = `http://localhost:3001`;

    const sqlQuery = `
      SELECT 
        u.id AS user_id,
        u.username AS user_name,
        u.email AS user_email,
        u.avatar AS avatar,
        GROUP_CONCAT(
          JSON_OBJECT(
            'story_id', s.id,
            'images_stories', CONCAT(?, s.images_stories),
            'viewers', s.viewers,
            'title', s.title,
            'created_at', s.created_at
          )
        ) AS stories
      FROM 
        users u
      INNER JOIN 
        stories s
      ON 
        u.id = s.user_id
      WHERE 
        s.created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
        AND u.id != ? 
      GROUP BY 
        u.id, u.username, u.email;
    `;

    db.query(sqlQuery, [baseUrl, userId], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to retrieve user stories list" });
      }

      // Parse stories JSON strings into arrays for easier frontend handling
      const formattedResults = results.map((row) => ({
        user_id: row.user_id,
        username: row.user_name,
        avatar: row.avatar,
        user_email: row.user_email,
        stories: JSON.parse(`[${row.stories}]`), // Convert the GROUP_CONCAT string back to an array
      }));

      res.status(200).json({ users: formattedResults });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user_view_stories_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const { id, receiverID } = req.body;

    const checkQuery = `
      SELECT
          *
      FROM
          stories
      WHERE
          JSON_CONTAINS(stories_user_id, ?, '$')
          AND user_id = ?
          AND id = ?;
    `;

    db.query(checkQuery, [userId, receiverID, id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve stories and images",
          details: err.message,
        });
      }

      if (results.length === 0) {
        const updateQuery = `
          UPDATE stories
          SET stories_user_id = JSON_ARRAY_APPEND(stories_user_id, '$', ?),
          viewers = viewers + 1
          WHERE user_id = ? AND id = ?;
        `;

        db.query(
          updateQuery,
          [userId, receiverID, id],
          (updateErr, updateResults) => {
            if (updateErr) {
              return res.status(500).json({
                error: "Failed to update stories_user_id",
                details: updateErr.message,
              });
            }
          }
        );
      }
      const baseUrl = `http://localhost:3001`;
      const selectQuery = `
      SELECT 
          id,
          user_id,
          CONCAT(?, images_stories) AS images_stories,
          viewers,
          title,
          created_at
        FROM stories
        WHERE user_id = ? 
          AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
    `;

      db.query(selectQuery, [baseUrl, receiverID], (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to retrieve stories and images",
            details: err.message,
          });
        }
        res.status(200).json({ stories: results });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/delete_user_chat_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ error: "receiverId is required" });
    }

    // Ensure delete_user_id is initialized as a JSON array if NULL
    const updateQuery = `
      UPDATE messages 
      SET delete_user_id = 
        CASE 
          WHEN delete_user_id IS NULL THEN JSON_ARRAY(?)
          WHEN JSON_CONTAINS(delete_user_id, JSON_QUOTE(?), '$') THEN delete_user_id 
          ELSE JSON_ARRAY_APPEND(delete_user_id, '$', ?) 
        END
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    `;

    db.query(
      updateQuery,
      [userId, userId, userId, userId, receiverId, receiverId, userId],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to update user chat list",
            details: err.message,
          });
        }
        res.status(200).json({ message: "Chat status updated successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/view_profile_list", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { viewId } = req.body;

    if (!viewId) {
      return res.status(400).json({ error: "viewId is required" });
    }

    const selectQuery = `SELECT * FROM users WHERE id = ?`;

    db.query(selectQuery, [viewId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve user details",
          details: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user: results[0] });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/block_user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ error: "receiverId is required" });
    }

    const selectQuery = `SELECT * FROM block_user WHERE sender_id = ? AND receiver_id = ?`;

    db.query(selectQuery, [userId, receiverId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve block status",
          details: err.message,
        });
      }

      if (results.length === 0) {
        // User is not blocked, so insert the block record
        const insertQuery = `INSERT INTO block_user (sender_id, receiver_id) VALUES (?, ?)`;

        db.query(insertQuery, [userId, receiverId], (insertErr) => {
          if (insertErr) {
            return res.status(500).json({
              error: "Failed to block user",
              details: insertErr.message,
            });
          }

          return res.status(200).json({ message: "User blocked successfully" });
        });
      } else {
        return res.status(400).json({ error: "User is already blocked" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/block_user_message", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ error: "receiverId is required" });
    }

    const selectQuery = `SELECT * FROM block_user WHERE sender_id = ? AND receiver_id = ?`;

    db.query(selectQuery, [userId, receiverId], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve block status",
          details: err.message,
        });
      }

      if (results.length === 0) {
        return res
          .status(200)
          .json({ message: "User Open Message successfully", data: true });
      } else {
        return res
          .status(400)
          .json({ message: "User Not Open Message successfully", data: false });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/images", upload.single("image"), (req, res) => {
  const userId = 1;
  const imagePath = `/uploads/${req.file.filename}`;
  const sql = "UPDATE users SET avatar = ? WHERE id = ?";
  db.query(sql, [imagePath, userId], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, avatar: imagePath });
  });
});

app.get("/images", (req, res) => {
  const userId = 1;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ userId: user.id }, SECRET_KEY);
      res.status(200).json({ token, email });
    }
  );
});

app.post("/upload", upload.array("images", 10), (req, res) => {
  try {
    const fileUrls = req.files.map(
      (file) => `http://localhost:3001/uploads/${file.filename}`
    );
    res.json({ urls: fileUrls });
  } catch (err) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.listen(3001, () => {
  console.log("Express server running on http://localhost:3001");
});

// WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    const { token, receiver_id, content, fileList } = parsedMessage;

    try {
      const { userId } = jwt.verify(token, SECRET_KEY);

      db.query(
        "INSERT INTO messages (sender_id, receiver_id, content, images, timestamp) VALUES (?, ?, ?, ?, NOW())",
        [userId, receiver_id, content, JSON.stringify(fileList)],
        (err, result) => {
          if (err) {
            return ws.send(JSON.stringify({ error: "Error saving message" }));
          }

          const insertedId = result.insertId;

          db.query(
            "SELECT timestamp FROM messages WHERE id = ?",
            [insertedId],
            (err, rows) => {
              if (err || rows.length === 0) {
                return ws.send(
                  JSON.stringify({ error: "Error retrieving timestamp" })
                );
              }

              const timestamp = rows[0].timestamp;

              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(
                    JSON.stringify({
                      id: insertedId,
                      senderId: userId,
                      receiverId: receiver_id,
                      content,
                      images: JSON.stringify(fileList),
                      timestamp,
                    })
                  );
                }
              });
            }
          );
        }
      );
    } catch (error) {
      console.error("Invalid token or message format", error);
    }
  });
});
