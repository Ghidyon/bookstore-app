/* 
TODO:
- Set up Mongoose
- Create Routes
*/

const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const Database = require('./src/database/setup');

// Import routes
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Connect to database
const db = new Database();
db.connect()
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.error(err.message);
        // exit with failure
        process.exit(1);
    });

// Middleware
app.use(express.json());
app.use(bookRoutes);
app.use('/auth', authRoutes); // the first parameter adds a prefix to the routes


app.listen(PORT, () => console.log(`app connected on port ${PORT}`));