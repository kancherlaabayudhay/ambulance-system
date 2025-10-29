const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin')); // Only admins can access user routes

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;