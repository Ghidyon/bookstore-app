/* 
    TODO:
    - Create a class for db connection
    - Start a local mongodb server connection
*/

const mongoose = require('mongoose');
const { DATABASE_URI } = process.env;

class Database {
    #connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    
    async connect() {
        await mongoose.connect(DATABASE_URI, this.#connectionOptions);         
    }
}

module.exports = Database;