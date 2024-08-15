const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const e = require('express');
const router = express.Router();

router.post('/instructor/sign-up', (req, res) => {
    const { name, contact_number, department, course, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send({ error: 'Error hashing password' });
        
        const sql = `INSERT INTO Instructor (name,  contact_number, department, course,email, password)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name,contact_number, department,course,email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send({ error: 'Database connection failed' });
            res.status(201).send({ id: result.insertId });
        });
    });
  
});

router.post('/exams', (req, res) => {
    const { examDate, examCourse, department, timing,examCourseCode } = req.body;

    const sql = `INSERT INTO Exam (exam_date, exam_course, department, timing,examCourseCode)
                 VALUES (?, ?, ?, ?)`;
    
    db.query(sql, [examDate, examCourse, department, timing], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201).json({ id: result.insertId });
    });
});

router.get('/get-course-code', (req, res) => {
    const { courseCode } = req.query; // Use req.query for GET requests
    const query = 'SELECT * FROM Exam WHERE examCourseCode = ?';
    
    db.query(query, [courseCode], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "No such course exists" });
        
        res.status(200).json(results);
    });
});

router.post('/update-exam', (req, res) => {
    const { id, examDate, examCourseCode, examCourse, department, timing } = req.body;

    const query = `
        UPDATE Exam
        SET exam_date = ?, examCourseCode = ?, exam_course = ?, department = ?, timing = ?
        WHERE id = ?;
    `;
    
    db.query(query, [examDate, examCourseCode, examCourse, department, timing, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database update failed" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Exam not found" });
        
        res.status(200).json({ message: "Exam details updated successfully" });
    });
});

router.post('/upload-marks',(req,res)=>{
    const {id,name, department,course,marks}= req.body;
    const query=`INSERT INTO Mark(id,name,department,course,marks)VALUES(?,?,?,?,?)`;
    db.query(query,[id,name,department,course,marks],(err,results)=>{
        if(err)  return res.status(500).json({ error: "Database update failed" });
        res.status(200).json({message:"Marks added successfully"});
    })
});

router.post('/update-marks', (req, res) => {
    const {id,name, department,course,marks}= req.body;

    const query = `
        UPDATE Exam
        SET id = ?, name = ?, department = ?, course = ?, marks = ?
        WHERE id = ?;
    `;
    
    db.query(query, [id, name, department, course, marks], (err, result) => {
        if (err) return res.status(500).json({ error: "Database update failed" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Exam not found" });
        
        res.status(200).json({ message: "Marks  updated successfully" });
    });
});
router.get('/students/by-department', (req, res) => {
    const { department } = req.query;

    if (!department) {
        return res.status(400).send({ error: 'Department is required' });
    }

    const sql = `SELECT * FROM Student WHERE department = ?`;
    db.query(sql, [department], (err, results) => {
        if (err) return res.status(500).send({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
