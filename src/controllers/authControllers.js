// Import User Model
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = '~no_none';
const expiry = 3600;

// Request and Response functions
exports.registerNewUser = (req, res) => {
    // fetch user details from the db
    // check if a user with the username exists
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) return res.status(500).json({ message: err });
        if (existingUser) return res.status(400).json({ message: 'Oops! There is an existing user with this username.' });

        // create a new user
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
        }, (err, newUser) => {
            if (err) return res.status(500).json({ message: err });

            // hash user's password
            // bcrypt generates a salt and uses it to hash user password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).json({ message: err });
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) return res.status(500).json({ message: err });

                    // save hashed password to the db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) return res.status(500).json({ message: err });

                        // create json web token for user
                        jwt.sign(
                            {
                                id: newUser._id,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                username: newUser.username
                            },
                            privateKey,
                            {
                                expiresIn: expiry
                            },
                            (err, token) => {
                                if (err) return res.status(500).json({ message: err });

                                // send token to user
                                return res.status(200).json({
                                    message: 'user registration successful',
                                    token
                                });
                            }
                        );
                    });
                });
            });
        })
    })
}