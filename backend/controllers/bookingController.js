const Booking = require('../models/Booking');
const Ambulance = require('../models/Ambulance');

exports.createBooking = async (req, res, next) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user.id
    };

    // Find nearest available ambulance
    const ambulance = await Ambulance.findOne({
      status: 'available',
      isActive: true
    });

    if (ambulance) {
      bookingData.ambulance = ambulance._id;
      bookingData.status = 'accepted';
      
      // Update ambulance status
      await Ambulance.findByIdAndUpdate(ambulance._id, {
        status: 'on_duty'
      });
    }

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('ambulance')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('ambulance')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('ambulance')
      .populate('driver', 'name phone');

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin/driver
    if (booking.user._id.toString() !== req.user.id && !['admin', 'driver'].includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to view this booking'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add the missing updateBooking function
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (booking.user.toString() !== req.user.id && !['admin', 'driver'].includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this booking'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone').populate('ambulance');

    res.status(200).json({
      status: 'success',
      data: {
        booking: updatedBooking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add the missing cancelBooking function
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (booking.user.toString() !== req.user.id && !['admin', 'driver'].includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to cancel this booking'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.completedAt = new Date();
    await booking.save();

    // If there was an ambulance assigned, make it available again
    if (booking.ambulance) {
      await Ambulance.findByIdAndUpdate(booking.ambulance, {
        status: 'available'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};