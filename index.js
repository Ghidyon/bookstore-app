/* 
TODO:
- Set up Mongoose
- Create Schema
- Create Routes

* Book Schema
{
    title,
    author,
    description
    category,
    purchaseCount,
    imageUrl,
    tags
}
*/

const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const Database = require('./db');

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

// Import Model
const Book = require('./model/book');

/* Book.create({
    title: 'Become a better programmer',
    author: 'Arthur Pendragon',
    description: 'Best-selling motivational series',
    category: 'Motivation',
    purchaseCount: 120,
    imageUrl: 'http://random_url.com',
    tags: ['computer', 'programmer', 'developer']
}, (err, book) => {
    if (err) handleError(err);
    else console.log({ book });
});
 */


app.listen(PORT, () => console.log(`app connected on port ${PORT}`));