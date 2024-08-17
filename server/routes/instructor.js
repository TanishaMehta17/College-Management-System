const express = require('express');
const connection = require('../db');
const sql= require('mysql2');
const InstructorRouter = express.Router();

InstructorRouter.post('/instructor/sign-up', (req, res) => {
    const { name, contact_number, department, course, email, password } = req.body;
    
    const sql = `INSERT INTO Instructor (name, contact_number, department, course, email, password)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [name, contact_number, department, course, email, password], (err, result) => {
        if (err) return res.status(500).send({ error: 'Database connection failed' });
        res.redirect('/screens/instructor_login.html'); 
    });
});
InstructorRouter.post('/instructor/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Instructor WHERE email = ?';
    
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection failed' });
        }

        if (results.length > 0) {
            const student = results[0];
            
            if (password === student.password) {
                return res.status(200).json({ message: 'Logged in successfully' });
            } else {
                return res.status(401).json({ error: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
});
InstructorRouter.post('/exams', (req, res) => {
    const { examDate, examCourse, department, timing, examCourseCode } = req.body;

    const sql = `INSERT INTO Exam (exam_date, exam_course, department, timing, exam_course_code)
                 VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(sql, [examDate, examCourse, department, timing, examCourseCode], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201).json({ id: result.insertId });
    });
});

InstructorRouter.get('/get-course-code', (req, res) => {
    const { courseCode } = req.query; // Use req.query for GET requests
    const query = 'SELECT * FROM Exam WHERE examCourseCode = ?';
    
    connection.query(query, [courseCode], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "No such course exists" });
        
        res.status(200).json(results);
    });
});

InstructorRouter.post('/update-marks', (req, res) => {
    const { id, department, course, marks } = req.body;

    const query = `
        UPDATE Mark
        SET marks = ?
        WHERE id = ? AND department = ? AND course = ?;
    `;
    
    connection.query(query, [marks, id, department, course], (err, result) => {
        if (err) return res.status(500).json({ error: "Database update failed" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Record not found" });
        
        res.status(200).json({ message: "Marks updated successfully" });
    });
});

InstructorRouter.post('/update-exam', (req, res) => {
    const { exam_course_code, exam_date, department, timing } = req.body;

    const query = `
        UPDATE Exam
        SET exam_date = ?, department = ?, timing = ?
        WHERE exam_course_code = ?;
    `;

    connection.query(query, [exam_date, department, timing, exam_course_code], (err, result) => {
        if (err) return res.status(500).json({ error: "Database update failed" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Exam not found" });

        res.status(200).json({ message: "Exam details updated successfully" });
    });
});

InstructorRouter.post('/upload-marks',(req,res)=>{
    const {id,name, department,course,marks}= req.body;
    const query=`INSERT INTO Mark(id,name,department,course,marks)VALUES(?,?,?,?,?)`;
    connection.query(query,[id,name,department,course,marks],(err,results)=>{
        if(err)  return res.status(500).json({ error: "Database update failed" });
        res.status(200).json({message:"Marks added successfully"});
    })
});



InstructorRouter.get('/students/by-department', (req, res) => {
    const { department } = req.query;

    if (!department) {
        return res.status(400).send({ error: 'Department is required' });
    }

    const sql = `SELECT * FROM Student WHERE department = ?`;
    
    connection.query(sql, [department], (err, results) => {
        if (err) return res.status(500).send({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
module.exports =InstructorRouter;