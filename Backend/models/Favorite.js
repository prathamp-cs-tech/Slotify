const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({

  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon',
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Favorite', favoriteSchema);