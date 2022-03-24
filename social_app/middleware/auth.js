const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //Get token from headerß
    const token = req.header('x-auth-token');
    
    //Check if no token
    if(!token ) {ß
        return res.status(401).json({ msg: "No token, Authorization denied!"});
    }

    //Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwttoken'));
        req.user = decoded.user;
    
        next();
    } catch(err){
        res.status(401).json({ msg:"Token is invalid!"});
    }
};