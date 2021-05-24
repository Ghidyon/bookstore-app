const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

// Setup Modelled Schema
const Book = require('../models/book');

// POST request to /books to create a new book
router.post('/books', (req, res) => {
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
router.get('/books', (req, res) => {
    // fetch all books
    Book.find({}, (err, books) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            // Send response to client
            res.status(200).json({
                message: "all books fetched",
                books
            })
        }
    });
});

// GET request to /books/:id to fetch a single book
router.get('/books/:id', (req, res) => {
    // fetch a single book
    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else if (!book) {
            return res.status(404).json({ message: "book does not exist" });
        } else {
            return res.status(200).json({
                message: "book fetched",
                book
            });
        }
    });
});

// PUT request to /books/:id to update a single book
router.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, book) => {
        if (err) return res.status(500).json({ message: err });
        else if (!book) return res.status(404).json({ message: "book not found" });
        else {
            book.save((err, updatedBook) => {
                if (err) return res.status(400).json({ message: err });
                else {
                    return res.status(200).json({
                        message: "updated book successfully",
                        updatedBook
                    });
                }
            });
        }
    });
});

// DELETE request to /books/:id to delete a single book
router.delete('/books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) return res.status(500).json({ message: err });
        else if (!book) return res.status(404).json({ message: "book not found" });
        else return res.status(200).json({ message: "book deleted successfully" });
    });
});

module.exports = router;