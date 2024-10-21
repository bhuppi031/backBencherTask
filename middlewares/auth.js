const jwt = require('jsonwebtoken');

const SECRET_KEY = 'YOUR_SECRET_KEY';
exports.authenticateToken=(req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

exports.isAdmin=(req, res, next)=> {
    if (req.user.username !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }
    next();
}


exports.validateUser=(req, res, next)=> {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    next();
}

exports.validateTask=(req, res, next)=> {
    const { title, completed } = req.body;
    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Title and completed status are required' });
    }
    next();
}
