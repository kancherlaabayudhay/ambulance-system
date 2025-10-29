const express = require('express');
const {
  getAllAmbulances,
  getAmbulance,
  updateAmbulanceLocation
} = require('../controllers/ambulanceController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getAllAmbulances);
router.get('/:id', getAmbulance);
router.put('/:id/location', restrictTo('admin', 'driver'), updateAmbulanceLocation);

module.exports = router;