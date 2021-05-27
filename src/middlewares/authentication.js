exports.authenticateUser = (req, res, next) => {
    // check if there's an authorization token
    if (!req.headers.authorization) return res.status(401).json({ message: "authorization header required" });
    
    // decode token
    // check if it's valid
    // allow user to continue with the request
    next(); // when the conditions in this function is fulfilled, next() calls the next function placed after it.
}