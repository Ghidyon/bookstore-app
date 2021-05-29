/* 
    TODO: Request and Response functions to:
    - Register New User
    - Login User
*/

// Import User Model
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('../services/jwtService');

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
                        let token = createToken(newUser);

                        if(!token) {
                            return res.status(500).json({ message: "an error occurred during authentication, please try again" });
                        }

                        // send token to user
                        return res.status(200).json({
                            message: 'user registration successful',
                            token
                        });
                    });
                });
            });
        })
    });
}

exports.loginUser = (req, res) => {
    // check if user exists
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) return res.status(500).json({ message: err });
        if (!foundUser) return res.status(401).json({ message: 'incorrect username' });

        // check if password is correct
        bcrypt.compare(req.body.password, foundUser.password)
            .then(match => {
                if (!match) return res.status(401).json({ message: 'incorrect password' });

                // create a token
                let token = createToken(foundUser);

                if(!token) {
                    return res.status(500).json({ message: "an error occurred during authentication, please try again" });
                }

                return res.status(200).json({
                    message: 'user logged in',
                    token
                });
            }).catch(err => res.status(500).json({message: err}));
    });
}