// routes/bookingRoutes.js

const express = require('express');

const router = express.Router();

const Booking = require('../models/Booking');

const Salon = require('../models/Salon');

const {
  protect,
} = require('../middleware/authMiddleware');

const convertTo24Hour =
  (time) => {

    let [hourMinute, period] =
      time.split(' ');

    let [hours, minutes] =
      hourMinute.split(':');

    hours = parseInt(hours);

    if (
      period.toLowerCase() === 'pm' &&
      hours !== 12
    ) {

      hours += 12;

    }

    if (
      period.toLowerCase() === 'am' &&
      hours === 12
    ) {

      hours = 0;

    }

    return `${hours
      .toString()
      .padStart(2, '0')}:${minutes}`;

  };

router.get(
  '/',
  protect,
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          userId: req.user._id,

        })

        .populate(
          'salonId',
          'name image address mapLink services'
        )

        .sort({
          createdAt: -1,
        });

      for (const booking of bookings) {

        if (
          booking.status ===
          'upcoming'
        ) {

            const time24 =
            convertTo24Hour(
              booking.bookingTime
            );
          
          const [hours, minutes] =
            time24.split(':');
          
          const [year, month, day] =
            booking.bookingDate
              .split('-')
              .map(Number);
          
          const bookingDateTime =
            new Date(
              year,
              month - 1,
              day,
              parseInt(hours),
              parseInt(minutes),
              0,
              0
            );
          
          const now = new Date();
          
          if (
            now > bookingDateTime
          ) {
          
            booking.status =
              'completed';
          
            await booking.save();
          
          }

        }

      }

      const formattedBookings =
        bookings.map((booking) => {

          const salon =
            booking.salonId;

          let service = null;

          if (
            salon &&
            salon.services
          ) {

            service =
              salon.services.find(

                item =>

                  item._id.toString() ===
                  booking.serviceId.toString()

              );

          }

          return {

            ...booking.toObject(),

            serviceId: service || null,

          };

        });

      res.json(
        formattedBookings
      );

    } catch (error) {

      console.log(error);

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
        serviceId,
        bookingDate,
        bookingTime,
      } = req.body;

      const existingBooking =
        await Booking.findOne({

          salonId,
          serviceId,
          bookingDate,
          bookingTime,
          status: 'upcoming',

        });

      if (existingBooking) {

        return res.status(400).json({
          message:
            'Slot already booked',
        });

      }

      const booking =
        await Booking.create({

          userId: req.user._id,

          salonId,

          serviceId,

          bookingDate,

          bookingTime,

        });

      res.status(201).json(
        booking
      );

    } catch (error) {

      console.log(error);
      console.log(req.body);

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
        await Booking.findOne({

          _id: req.params.id,

          userId: req.user._id,

        });

      if (!booking) {

        return res.status(404).json({
          message:
            'Booking not found',
        });

      }

      booking.status =
        'cancelled';

      await booking.save();

      res.json({
        message:
          'Booking cancelled',
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.put(
  '/:bookingId/rate',
  protect,
  async (req, res) => {

    try {

      const {
        bookingId,
      } = req.params;

      const {
        rating,
        review,
      } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({
          message:
            'Booking not found',
        });

      }

      if (

        booking.userId.toString() !==
        req.user._id.toString()

      ) {

        return res.status(401).json({
          message:
            'Unauthorized',
        });

      }

      if (
        booking.status !==
        'completed'
      ) {

        return res.status(400).json({
          message:
            'Only completed bookings can be rated',
        });

      }

      if (booking.isRated) {

        return res.status(400).json({
          message:
            'Already rated',
        });

      }

      booking.rating = rating;

      booking.review =
        review || '';

      booking.isRated = true;

      await booking.save();

      const salon =
        await Salon.findById(
          booking.salonId
        );

      const service =
        salon.services.id(
          booking.serviceId
        );

      if (service) {

        const ratings =
          await Booking.find({

            serviceId:
              booking.serviceId,

            rating: {
              $gt: 0,
            },

          });

        const total =
          ratings.reduce(

            (sum, item) =>

              sum + item.rating,

            0

          );

        service.averageRating =

          ratings.length > 0

            ? total / ratings.length

            : 0;

        service.totalRatings =
          ratings.length;

        await salon.save();

      }

      res.json({
        message:
          'Rating submitted',
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;