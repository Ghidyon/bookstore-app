const express = require('express');
const router = express.Router();

// Import Middleware
const { authenticateUser } = require('../middlewares/authentication');

// Import book controllers
const BookController = require('../controllers/bookControllers');

// POST request to /books to create a new book
router.post('/books', BookController.createBook);

// GET request to /books to fetch all books
router.get('/books', authenticateUser, BookController.fetchBooks);

// GET request to /books/:id to fetch a single book
router.get('/books/:id', BookController.fetchOneBook);

// PUT request to /books/:id to update a single book
router.put('/books/:id', BookController.updateOneBook);

// DELETE request to /books/:id to delete a single book
router.delete('/books/:id', BookController.deleteOneBook);

module.exports = router;