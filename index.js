const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // Import path module

// Import routes
const studentRouter = require('./server/routes/student');
const instructorRouter = require('./server/routes/instructor');
const adminRouter = require('./server/routes/admin');

// Import database connection
const connection = require('./server/db');

const app = express();
const PORT = 5000;

app.set('views', path.join(__dirname, 'screens')); // Corrected to 'views'
app.use('/screens', express.static(path.join(__dirname, 'screens')));
app.set('view engine', 'jade');

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Static files directory

// Use routes
app.use( studentRouter); // Prefix the student routes
app.use( instructorRouter); // Prefix the instructor routes
app.use( adminRouter); // Prefix the admin routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'welome_page.html')); // Serve the welcome_page.html
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
