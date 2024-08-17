const express = require('express');
const connection = require('../db');
const sql= require('mysql2');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));


router.post('/students/sign-up', (req, res) => {
    const name = req.body.name;
    const rollNo = req.body.rollNo;
    const department = req.body.department;
    const contactNumber = req.body.contactNumber;
    const open_course = req.body.open_course;
    const elective = req.body.elective;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name);
    // SQL query to insert data
    const sql = `INSERT INTO Student (name, rollNo, contactNumber, department, open_course, elective, email, password)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with parameterized values
    connection.query(sql, [name, rollNo, contactNumber, department, open_course, elective, email, password], (err, result) => {

        if (err) return res.status(500).send({ error: 'Database connection failed' });
        res.redirect('/screens/login.html');
    });
});

// router.post('/students/sign-up', function(req, res) {
//     res.render('screens/signup_student.html');
//   });

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM student WHERE email = ?';
    
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

router.get('/get-exam-details', (req, res) => {
    const query = 'SELECT * FROM Exam';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        console.log(results);  // Log the results to the console
        res.status(200).json(results);
    });
});


router.get('/get-marks', (req, res) => {
    const { rollNumber } = req.query;

    const query = 'SELECT * FROM mark WHERE id = ?';
    
    connection.query(query, [rollNumber], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "No records found for the provided roll number" });
        
        res.status(200).json(results);
    });
});
router.get('/get-all-instrctor',(req,res)=>{
    const query= 'SELECT* FROM Instructor';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(200).json(results);
    });
});
module.exports = router;
