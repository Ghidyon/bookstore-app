/* 
    TODO
    - Authenticate user to have a token that will be used to allow requests on all book routes
    - Therefore, they must be logged in before they can do anything on the application
*/

const jwt = require('jsonwebtoken');
const privateKey = '~no_none';

exports.authenticateUser = (req, res, next) => {
    // check if there's an authorization token
    if (!req.headers.authorization) return res.status(401).json({ message: "authorization header required" });
    
    // token format is like this ====> 'Bearer <token>'
    let splittedHeader = req.headers.authorization.split(' ');
    if (splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "authorization format should be 'Bearer <token>'" });
    }
    // decode token
    let token = splittedHeader[1];
    // If token is valid, returns user's decoded payload
    jwt.verify(token, privateKey, (err, decodedToken) => {
        if (err) return res.status(500).json({ err });
        // check if it's valid
        if (!decodedToken) return res.status(401).json({ message: "invalid authorization token, please login" });

        // Add user payload to request, so as to make user accessible outside this function
        req.user = decodedToken;
        // allow user to continue with the request
        next(); // when the conditions in this function is fulfilled, next() calls the next function placed after it.
    });
}

exports.checkIfAdmin = (req, res, next) => {
    let { role } = req.user;
    if (role !== 'admin') {
        return res.status(401).json({ message: 'this route is restricted to admin users' });
    }
    return next();
}  