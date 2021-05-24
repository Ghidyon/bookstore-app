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

/* Book.find({}, (err, books) => {
    if (err) handleError(err);
    else console.log({ books });
});
 */

// Middleware
app.use(express.json());

// POST request to /books to create a new book
app.post('/books', (req, res) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: req.body.purchaseCount,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    }, (err, newBook) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: "new book created",
                newBook
            });
        }
    });
});

// GET request to /books to fetch all books
// GET request to /books/:id to fetch a single book
// PUT request to /books/:id to update a single book
// DELETE request to /books/:id to delete a single book

app.listen(PORT, () => console.log(`app connected on port ${PORT}`));