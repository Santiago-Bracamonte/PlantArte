const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
        return res.status(400).json({ message: 'Por favor ingresa un nombre de usuario y contraseña.' });
    }

    try {
        const userExists = await User.findOne({ username: trimmedUsername });

        if (userExists) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

        const user = await User.create({
            username: trimmedUsername,
            password: hashedPassword,
            role: 'client'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor durante el registro.' });
    }
};

const authUser = async (req, res) => {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
        return res.status(400).json({ message: 'Por favor ingresa un nombre de usuario y contraseña.' });
    }

    try {
        const user = await User.findOne({ username: trimmedUsername });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const passwordMatches = await bcrypt.compare(trimmedPassword, user.password);

        if (passwordMatches) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.' });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
};