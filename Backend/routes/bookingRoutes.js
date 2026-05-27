const express = require('express');

const router = express.Router();

const Booking =
  require('../models/Booking');

const {
  protect,
} = require('../middleware/authMiddleware');

router.get(
  '/',
  protect,
  async (req, res) => {

    try {

      const now = new Date();

      const bookings =
        await Booking.find({

          userId: req.user._id,

        }).populate('salonId');

      for (const booking of bookings) {

        if (
          booking.status === 'upcoming' &&
          booking.bookingDate < now
        ) {

          booking.status =
            'completed';

          await booking.save();

        }

      }

      const updatedBookings =
        await Booking.find({

          userId: req.user._id,

        })
        .populate('salonId')
        .sort({
          bookingDate: -1,
        });

      res.json(updatedBookings);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.post(
  '/',
  protect,
  async (req, res) => {

    try {

      const {
        salonId,
        bookingDate,
      } = req.body;

      const booking =
        await Booking.create({

          userId:
            req.user._id,

          salonId,

          bookingDate,

          status: 'upcoming',

        });

      const populatedBooking =
        await Booking.findById(
          booking._id
        ).populate('salonId');

      res.status(201).json(
        populatedBooking
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.put(
  '/:id/cancel',
  protect,
  async (req, res) => {

    try {

      const booking =
        await Booking.findOneAndUpdate(

          {
            _id: req.params.id,
            userId:
              req.user._id,
          },

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

  }
);

module.exports = router;