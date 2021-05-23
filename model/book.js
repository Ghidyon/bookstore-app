/*
TODO: Create a Schema
{
    title,
    author,
    category,
    purchaseCount,
    imageUrl,
    description
}
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
});

// Remember mongoose takes the singular word and interprets the collection in plurals
module.exports = mongoose.model('book', bookSchema);