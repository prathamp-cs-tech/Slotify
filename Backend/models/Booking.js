const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salon',
    },

    date: String,

    time: String,

    status: {
        type: String,
        default: 'upcoming',
    },

});

module.exports = mongoose.model(
    'Booking',
    bookingSchema
);