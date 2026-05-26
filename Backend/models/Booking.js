const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon',
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: 'upcoming',
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);