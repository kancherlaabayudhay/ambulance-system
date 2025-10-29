const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getUserBookings
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/', restrictTo('admin', 'driver'), getBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.put('/:id/cancel', cancelBooking);

module.exports = router;