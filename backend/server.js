const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quizdua'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/quizdua', (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const checkSql = "SELECT * FROM login WHERE username = ? OR email = ?";
    db.query(checkSql, [username, email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length > 0) {
            const existingUsernames = results.filter(result => result.username === username);
            const existingEmails = results.filter(result => result.email === email);
            if (existingUsernames.length > 0 && existingEmails.length > 0) {
                return res.status(400).json({ error: { username: 'Username already exists', email: 'Email already exists' } }); 
            } else if (existingUsernames.length > 0) {
                return res.status(400).json({ error: { username: 'Username already exist' } });
            } else if (existingEmails.length > 0) {
                return res.status(400).json({ error: { email: 'Email already exists' } });
            }
        }

        // If username and email are not taken, proceed to insert
        const sql = "INSERT INTO login (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, password], (err, data) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            return res.json({ message: 'Register success' });
        });
    });
});

// login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length > 0) {
            return res.json({ message: 'Login success', username: results[0].username });
        } else {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
