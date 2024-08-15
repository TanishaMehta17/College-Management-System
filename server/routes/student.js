const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

router.post('/students/sign-up', (req, res) => {
    const { name, rollNo, contactNumber, department, open_course, elective, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send({ error: 'Error hashing password' });
        
        const sql = `INSERT INTO Student (name, rollNo, contactNumber, department, open_course, elective, email, password)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name, rollNo, contactNumber, department, open_course, elective, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send({ error: 'Database connection failed' });
            res.status(201).send({ id: result.insertId });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM student WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database connection failed' });

        if (results.length > 0) {
            const student = results[0];
            bcrypt.compare(password, student.password, (err, isMatch) => {
                if (err) return res.status(500).json({ error: 'Error comparing passwords' });
                if (isMatch) return res.status(200).json({ message: 'Logged in successfully' });
                return res.status(401).json({ error: 'Incorrect password' });
            });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
});

router.get('/get-exam-details',(req,res)=>{
    const query= 'SELECT* FROM Exam';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});

router.get('/get-marks', (req, res) => {
    const { rollNumber } = req.query;

    const query = 'SELECT * FROM mark WHERE id = ?';
    
    db.query(query, [rollNumber], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "No records found for the provided roll number" });
        
        res.status(200).json(results);
    });
});

module.exports = router;
