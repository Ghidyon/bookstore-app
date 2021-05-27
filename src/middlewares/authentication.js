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
    jwt.verify(token, privateKey, (err, decodedToken) => {
        if (err) return res.status(500).json({ err });
        // check if it's valid
        if (!decodedToken) return res.status(401).json({ message: "invalid authorization token, please login" })
        
        // allow user to continue with the request
        next(); // when the conditions in this function is fulfilled, next() calls the next function placed after it.
    });
}