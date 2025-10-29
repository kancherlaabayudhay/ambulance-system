const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['basic', 'advanced', 'mobile_icu', 'neonatal'],
    default: 'basic'
  },
  status: {
    type: String,
    enum: ['available', 'on_duty', 'maintenance', 'offline'],
    default: 'available'
  },
  currentLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    lastUpdated: Date
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  capacity: {
    type: Number,
    default: 1
  },
  equipment: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

ambulanceSchema.index({ 'currentLocation.coordinates': '2dsphere' });

module.exports = mongoose.model('Ambulance', ambulanceSchema);