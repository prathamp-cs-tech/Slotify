const mongoose = require('mongoose');

const notificationSchema =
  new mongoose.Schema(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true,

      },

      targetRole: {

        type: String,

        enum: [
          'user',
          'provider',
        ],

        required: true,

      },

      title: {

        type: String,

        required: true,

      },

      message: {

        type: String,

        required: true,

      },

      type: {

        type: String,

        enum: [

          'booking_confirmed',

          'booking_received_provider',

          'booking_cancelled_user',

          'booking_cancelled_provider',

        ],

        required: true,

      },

      bookingId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Booking',

      },

      isRead: {

        type: Boolean,

        default: false,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(
    'Notification',
    notificationSchema
  );