/* 
    TODO:
    - Setup Book Model
    - Request and response functions for routes
*/

// Setup Modelled Schema
const Book = require('../models/book');

// All request and response functions for book routes
exports.createBook = (req, res) => {
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
}

exports.fetchBooks = (req, res) => {
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
}

exports.fetchOneBook =  (req, res) => {
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
}

exports.updateOneBook = (req, res) => {
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
}

exports.deleteOneBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) return res.status(500).json({ message: err });
        else if (!book) return res.status(404).json({ message: "book not found" });
        else return res.status(200).json({ message: "book deleted successfully" });
    });
}