const jwt = require('jsonwebtoken');

const JWT_SECRET = 'THis$WebsiteMy$Id'; 

const fetchuser = (req, res, next) => {
    // get user from JWT token and add id to req object
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({error: "Invalid token: Please authenticate with valid token"})
    }
    try {
        const verifyToken = jwt.verify(token, JWT_SECRET)
        req.user = verifyToken.user
        next();
    } catch (error) {
        res.status(401).send({error: "Invalid token: Please authenticate with valid token"})
    }
    
} 

module.exports = fetchuser