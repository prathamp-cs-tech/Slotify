const mongoose = require('mongoose');

const bookingSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    salonId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'Salon',
      required: true,
    },

    bookingDate: {
      type: Date,
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

  }, {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    'Booking',
    bookingSchema
  );