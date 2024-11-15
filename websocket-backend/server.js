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
    methods: ["GET", "POST"], // Specify allowed HTTP methods
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
        return res.status(500).json({ error: "Failed to retrieve user list", details: err.message });
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
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify the token and extract userId
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId; // Assuming the token payload has userId

    console.log("Decoded User ID:", userId);

    // Get receiverId from query parameters
    const { receiverID } = req.query;

    if (!receiverID) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    // SQL Query: Fetch messages between the user and the receiver
    db.query(
      "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC",
      [userId, receiverID, receiverID, userId],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Failed to retrieve chat messages", details: err.message });
        }
        // Return the chat messages as the response
        res.status(200).json({ messages: results });
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});


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
          return res.status(500).json({ error: "Failed to retrieve user", details: err.message });
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

app.get("/user_search_list", async (req, res) => {
  try {
    const { value } = req.query; // Get the search term from query parameters
    // console.log("req.query",req.query);
    // Ensure the search term is provided
    if (!value || value.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    // SQL Query: Search for users where the username contains the search term
    db.query(
      "SELECT * FROM users WHERE username LIKE ?",
      [`%${value}%`], // `%value%` is the LIKE query for partial matching
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Failed to retrieve users", details: err.message });
        }
        
        if (results.length === 0) {
          return res.status(404).json({ error: "No users found" });
        }

        // Return the matching user data
        res.status(200).json({ users: results });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
});





// User login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ userId: user.id }, SECRET_KEY);
      res.status(200).json({ token, username });
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
                return ws.send(JSON.stringify({ error: "Error retrieving timestamp" }));
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