const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            req.userId = decoded.id; 
            req.user.role = decoded.role;

            next();
        } catch (error) {
            console.error('Error de token:', error.message);
            return res.status(401).json({ message: 'No autorizado, token fallido' }); 
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' }); 
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado, solo administradores' });
    }
};

module.exports = { protect, admin };
