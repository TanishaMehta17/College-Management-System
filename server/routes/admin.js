const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

router.post('/instructor/sign-up', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send({ error: 'Error hashing password' });
        
        const sql = `INSERT INTO Admin (name, email, password)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name,email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send({ error: 'Database connection failed' });
            res.status(201).send({ id: result.insertId });
        });
    });

    router.get('/student-details', (req, res) => {
        const query = 'SELECT * FROM Student';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            res.status(200).json(results);
        });
    });
    router.get('/instructor-details', (req, res) => {
        const query = 'SELECT * FROM Instructor';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            res.status(200).json(results);
        });
    });
    router.get('/exam-details', (req, res) => {
        const query = 'SELECT * FROM Exam';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            res.status(200).json(results);
        });
    });
    router.get('/Mark-details', (req, res) => {
        const query = 'SELECT * FROM Mark';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            res.status(200).json(results);
        });
    });
    
});