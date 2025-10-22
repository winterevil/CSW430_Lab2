const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'Lab2Mobile'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.post('/api/users', (req, res) => {
    const { fullname, email } = req.body;
    const sql = 'INSERT INTO users (fullname, email) VALUES (?, ?)';

    db.query(sql, [fullname, email], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        } else {
            res.status(201).json({ message: 'User created', userId : result.insertId });
        }
    });
})

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching users', error: err });
        } else {
            res.json(result);
        }
    });
})

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE userId = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching user', error: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(result[0]);
        }
    });
})

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { fullname, email } = req.body;
    const sql = 'UPDATE users SET fullname = ?, email = ? WHERE userId = ?';

    db.query(sql, [fullname, email, userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error updating user', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User updated' });
        }
    });
})

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE userId = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting user', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted' });
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});