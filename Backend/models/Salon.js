const mongoose = require('mongoose');

const serviceSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        'Hair',
        'Beard',
        'Facial',
        'Makeup',
        'Spa',
      ],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      default: 30,
    },

    image: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    blockedSlots: [
      {
        date: String,
        slots: [String],
      },
    ],

  });

const salonSchema =
  new mongoose.Schema({

    ownerId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: '',
    },

    mapLink: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    whatsapp: {
      type: String,
      default: '',
    },

    services: [serviceSchema],

  },
  {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    'Salon',
    salonSchema
  );