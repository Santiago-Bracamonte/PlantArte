const User = require('../models/User'); 

exports.getAllUsers = async (req, res) => {
  try {
   
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
  }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, role } = req.body; 

        if (role && (role !== 'admin' && role !== 'client')) {
            return res.status(400).json({ message: 'Rol inválido proporcionado.' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (username) {
            user.username = username;
        }
        if (role) {
            user.role = role;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            role: updatedUser.role,
        });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
        }
        res.status(500).json({ message: 'Error interno del servidor al actualizar el usuario.' });
    }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId === id) { 
      return res.status(403).json({ message: 'No puedes eliminar tu propio usuario de administrador.' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar el usuario.' });
  }
};