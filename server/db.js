const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tanisha1709',
    database: 'dbms'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);

    const createStudentTable = `
        CREATE TABLE IF NOT EXISTS Student (
            rollNo INT PRIMARY KEY NOT NULL,
            name VARCHAR(20) NOT NULL,
            contactNumber VARCHAR(20) NOT NULL,
            department VARCHAR(20) NOT NULL,
            open_course VARCHAR(20) NOT NULL,
            elective VARCHAR(20) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    const createExamTable = `
        CREATE TABLE IF NOT EXISTS Exam (
            id INT PRIMARY KEY AUTO_INCREMENT,
            exam_date DATE NOT NULL,
            exam_course VARCHAR(100) NOT NULL,
            department VARCHAR(50) NOT NULL,
            timing VARCHAR(20) NOT NULL,
            exam_course_code VARCHAR(20) NOT NULL
        );
    `;

    const createInstructorTable = `
        CREATE TABLE IF NOT EXISTS Instructor (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            contact_number VARCHAR(20) NOT NULL,
            department VARCHAR(50) NOT NULL,
            course VARCHAR(100) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;
    const createMarkTable = `
   CREATE TABLE IF NOT EXISTS Mark (
    id VARCHAR(50) ,
    name VARCHAR(100),
    department VARCHAR(100),
    course VARCHAR(100),
    marks INT
);

`;
const createAdminTable = `
CREATE TABLE IF NOT EXISTS Admin (
 id VARCHAR(50) ,
 name VARCHAR(100),
  email VARCHAR(50) NOT NULL,
 password VARCHAR(255) NOT NULL
);

`;


    

    connection.query(createStudentTable, (err, results) => {
        if (err) {
            console.error('Error creating Student table:', err.stack);
            return;
        }
        console.log('Student table created or verified successfully.');
    });

    connection.query(createExamTable, (err, results) => {
        if (err) {
            console.error('Error creating Exam table:', err.stack);
            return;
        }
        console.log('Exam table created or verified successfully.');
    });

    connection.query(createInstructorTable, (err, results) => {
        if (err) {
            console.error('Error creating Instructor table:', err.stack);
            return;
        }
        console.log('Instructor table created or verified successfully.');
    });
    connection.query(createMarkTable, (err, results) => {
        if (err) {
            console.error('Error creating Instructor table:', err.stack);
            return;
        }
        console.log('Mark table created or verified successfully.');
    });
    connection.query(createAdminTable, (err, results) => {
        if (err) {
            console.error('Error creating Instructor table:', err.stack);
            return;
        }
        console.log('Admin table created or verified successfully.');
    });
});

module.exports = connection;
