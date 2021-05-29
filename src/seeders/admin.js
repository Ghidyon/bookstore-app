const User = require('../models/user');
const bcrypt = require('bcryptjs');
let passCode = 'support';

exports.seedAdmin = () => {
    // Check if there's an admin account
    User.findOne({ role: 'admin' }, (err, admin) => {
        if (err) throw err;
        if (admin) return "admin already exists!";
        
        // Then create an admin account
        User.create({
            firstName: 'Book',
            lastName: 'Goblin',
            username: 'bookgoblin',
            role: 'admin'
        }, (err, user) => {
            if (err) throw err;
            // hash the password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(passCode, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save((err, savedUser) => {
                        if (err) throw err;
                        return "admin account created!";
                    });
                });
            });
        });

    });
}
