const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db');
const adminRouter = express.Router();
adminRouter.use(express.urlencoded({ extended: true }));


adminRouter.post('/admin/sign-up', (req, res) => {
    const { id, name, email, password } = req.body;

    const sql = `INSERT INTO Admin (id, name, email, password)
                 VALUES (?, ?, ?, ?)`;
    db.query(sql, [id, name, email, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database connection failed' });
        }
        res.redirect('/screens/login.html');
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