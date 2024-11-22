const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const mysql = require("mysql2");

const app = express();
const PORT = 8080;
const SECRET_KEY = "your_secret_key"; // Use an environment variable in production

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "", // replace with your MySQL password
  database: "chat_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

app.use(bodyParser.json());

// User registration endpoint
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
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId; // Assuming the token payload has userId

    console.log("Decoded User ID:", userId);

    // Fetch user list from the database, excluding the current user
    db.query("SELECT * FROM users WHERE id != ?", [userId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
          error: "Failed to retrieve user list",
          details: err.message,
        });
      }
      res.status(200).json({ users: results });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/chat_list", async (req, res) => {
  try {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    // If token is not provided, return an error
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify the token and extract the userId
    const decoded = jwt.verify(token, SECRET_KEY); // Assuming SECRET_KEY is defined
    const userId = decoded.userId;

    console.log("Decoded User ID:", userId);

    // Extract receiverID from the query parameters
    const { receiverID } = req.query;

    // If receiverID is not provided, return an error
    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    // SQL query to fetch chat messages between the user and the receiver
    db.query(
      "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC",
      [userId, receiverID, receiverID, userId],
      (err, messages) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({
            error: "Failed to retrieve chat messages",
            details: err.message,
          });
        }

        // SQL query to count active stories for the receiver in the past 24 hours
        const sql = `
          SELECT COUNT(*) AS record_count 
          FROM stories 
          WHERE STATUS = 'active' 
            AND user_id = ? 
            AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
        `;
        db.query(sql, [receiverID], (err, storyResults) => {
          if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Database error" });
          }

          // Determine if there are active stories and the number of such stories
          const recordCount = storyResults[0]?.record_count || 0;
          const flag = recordCount > 0;

          // Send response with messages and story flag
          res.status(200).json({ messages, flag });
        });
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

// app.get("/chat_list", async (req, res) => {
//   try {
//     // Extract token from Authorization header
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

//     if (!token) {
//       return res.status(403).json({ error: "No token provided" });
//     }

//     // Verify the token and extract userId
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const userId = decoded.userId; // Assuming the token payload has userId

//     console.log("Decoded User ID:", userId);

//     // Get receiverId from query parameters
//     const { receiverID } = req.query;

//     if (!receiverID) {
//       return res.status(400).json({ error: "Receiver ID is required" });
//     }

//     // SQL Query: Fetch messages between the user and the receiver
//     db.query(
//       "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC",
//       [userId, receiverID, receiverID, userId],
//       (err, results) => {
//         if (err) {
//           console.error("Database query error:", err);
//           return res.status(500).json({
//             error: "Failed to retrieve chat messages",
//             details: err.message,
//           });
//         }

//         const sql = `
//         SELECT COUNT(*) AS record_count
//         FROM stories
//         WHERE STATUS = 'active'
//           AND user_id = ?
//           AND created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
//       `;
//         db.query(sql, [receiverID], (err, results) => {
//           if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ error: "Database error" });
//           }

//           const recordCount = results[0]?.record_count || 0;
//           const flag = recordCount > 0;

//           res.status(200).json({ messages: results, flag, recordCount });
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// });

app.get("/user_receiver_list", async (req, res) => {
  try {
    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    // SQL Query: Fetch a single user by ID
    db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [receiverID],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve user", details: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        // Return the user data as the response
        res.status(200).json({ user: results[0] }); // Return only the first record
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/user_profile_list", async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify the token and extract userId
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId; // Assuming the token payload has userId

    console.log("Decoded User ID:", userId);

    // SQL Query: Fetch a single user by ID
    db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve user", details: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        // Return the user data as the response
        res.status(200).json({ user: results[0] }); // Return only the first record
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.put("/update_user_profile_list", async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify the token and extract userId
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId; // Assuming the token payload has userId

    console.log("Decoded User ID:", userId);

    // Extract the username from request body
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // SQL Query: Update the user's username
    const updateQuery = "UPDATE users SET username = ? WHERE id = ?";

    db.query(updateQuery, [username, userId], (err, results) => {
      if (err) {
        console.error("Database update error:", err);
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

      // Return a success message
      res.status(200).json({ message: "User profile updated successfully" });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/user_stories_list", async (req, res) => {
  try {
    // Extracting receiverID from query parameters
    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    // SQL Query to retrieve active stories and associated images for the specified user
    const sqlQuery = `
      SELECT 
          s.id AS story_id,                    
          s.user_id,                           
          s.created_at AS story_created_at,    
          si.id AS image_id,                   
          si.images_stories,                   
          si.viewers,                          
          si.title,                          
          si.created_at AS image_created_at    
      FROM 
          stories AS s
      JOIN 
          stories_images AS si
      ON 
          s.id = si.stories_id                 
      WHERE 
          s.status = 'active' 
          AND s.user_id = ?
          AND s.created_at BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW()
    `;

    // Perform the query with receiverID as a parameter
    db.query(sqlQuery, [receiverID], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
          error: "Failed to retrieve stories and images",
          details: err.message,
        });
      }

      // Return the results as a JSON response
      res.status(200).json({ stories: results });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
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

// Start the Express server for REST API
app.listen(3001, () => {
  console.log("Express server running on http://localhost:3001");
});

// WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    const { token, receiver_id, content } = parsedMessage;

    try {
      const { userId } = jwt.verify(token, SECRET_KEY);

      // Save message to database with sender and receiver
      db.query(
        "INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES (?, ?, ?, NOW())",
        [userId, receiver_id, content],
        (err, result) => {
          if (err) {
            return ws.send(JSON.stringify({ error: "Error saving message" }));
          }

          const insertedId = result.insertId;

          // Query the inserted row to get the timestamp
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

              // Broadcast message to the receiver only
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(
                    JSON.stringify({
                      id: insertedId,
                      senderId: userId,
                      receiverId: receiver_id,
                      content,
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
      console.log("Invalid token or message format");
    }
  });
});

// Start the Express server for REST API
// app.listen(3001, () => {
//     console.log('Express server running on http://localhost:3001');
// });
