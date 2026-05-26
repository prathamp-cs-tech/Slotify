const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');

router.get('/', async (req, res) => {

  try {
    const bookings = await Booking.find().populate('salonId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.put('/:id/cancel', async (req, res) => {

    try {
  
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: 'cancelled',
        },
        {
          new: true,
        }
      );
  
      res.json(booking);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
  
    }
  
  });

module.exports = router;