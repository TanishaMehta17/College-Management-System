const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // Import path module
// body-parser is no longer needed if you're using Express 4.16.0 or later
// const bodyParser = require('body-parser');

const router = require('./server/routes/student');
const instructorRouter = require('./server/routes/instructor');
const connection = require('./server/db');

const app = express();
const PORT = 5000;

// Set the path for views and view engine
app.set('views', path.join(__dirname, 'screens')); // Corrected to 'views'
app.use('/screens', express.static(path.join(__dirname, 'screens')));
app.set('view engine', 'jade');

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON
app.use(express.urlencoded({ extended: false })); // Use express.urlencoded() for form data
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(router); // Ensure the routes are correctly prefixed
app.use('/instructors', instructorRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
