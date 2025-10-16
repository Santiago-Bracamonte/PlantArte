const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller'); 

const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', [protect, admin], usersController.getAllUsers);
router.put('/:id', [protect, admin], usersController.updateUser);
router.delete('/:id', [protect, admin], usersController.deleteUser);

module.exports = router;