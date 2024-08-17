const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db');
const adminRouter = express.Router();
adminRouter.use(express.urlencoded({ extended: true }));


adminRouter.post('/admin/sign-up', (req, res) => {
    const { id, name, email, password } = req.body;

    const sql = `INSERT INTO Admin (id, name, email, password)
                 VALUES (?, ?, ?, ?)`;
    connection.query(sql, [id, name, email, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database connection failed' });
        }
        res.redirect('/screens/login.html');
    });
});
adminRouter.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Admin WHERE email = ?';
    
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection failed' });
        }

        if (results.length > 0) {
            const admin = results[0];
            
            // Password comparison (assuming no hashing is being used)
            if (password == admin.password) {
                res.redirect('/screens/dashboard_admin.html');
            } else {
                return res.status(401).json({ error: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
});

adminRouter.get('/student-details', (req, res) => {
    const query = 'SELECT * FROM Student';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
adminRouter.get('/instructor-details', (req, res) => {
    const query = 'SELECT * FROM Instructor';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
adminRouter.get('/exam-details', (req, res) => {
    const query = 'SELECT * FROM Exam';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
adminRouter.get('/Mark-details', (req, res) => {
    const query = 'SELECT * FROM Mark';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});

module.exports= adminRouter