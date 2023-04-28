const session = require('express-session');

const ensureAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role == 'admin') {
        next();
    } else {
        res.status(401).json({ message: "You are not authorized to perform this action." });
    }
}

module.exports = ensureAdmin;