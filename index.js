const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const studentRouter = require('./server/routes/student');
const instructorRouter= require('./server/routes/instructor');
const connection = require('./server/db');
const app = express();
const PORT = 5000;



app.use(express.json());
app.use(studentRouter);
app.use(instructorRouter);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

