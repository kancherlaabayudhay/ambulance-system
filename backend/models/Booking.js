const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: [true, 'Please provide patient name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide contact phone']
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  destination: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  emergencyType: {
    type: String,
    enum: ['general', 'cardiac', 'trauma', 'stroke', 'respiratory', 'other'],
    default: 'general'
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'dispatched', 'arrived', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  ambulance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ambulance'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  estimatedArrival: Date,
  actualArrival: Date,
  completedAt: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for geospatial queries
bookingSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);