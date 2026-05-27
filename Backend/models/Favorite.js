// models/Favorite.js

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({

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

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  'Favorite',
  favoriteSchema
);