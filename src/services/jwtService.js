/* 
    TODO: 
    - Sign json web token
*/

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.createToken = user => {
    try {
        let token = jwt.sign(
            {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            SECRET,
            {
                expiresIn: expiry
            }
        );
        return token;        
    } catch (error) {
        return null;
    }
}

exports.decodeToken = token => {
    try {
        let decodedToken = jwt.verify(token, SECRET);
        return decodedToken;
    } catch (error) {
        return null;
    }
}