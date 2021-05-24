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
const bookRoutes = require('./src/routes/bookRoutes');

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


app.listen(PORT, () => console.log(`app connected on port ${PORT}`));