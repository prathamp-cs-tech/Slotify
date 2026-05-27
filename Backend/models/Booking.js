// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon',
    required: true,
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  bookingDate: {
    type: String,
    required: true,
  },

  bookingTime: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: [
      'upcoming',
      'completed',
      'cancelled',
    ],
    default: 'upcoming',
  },

  rating: {
    type: Number,
    default: 0,
  },

  review: {
    type: String,
    default: '',
  },

  isRated: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  'Booking',
  bookingSchema
);