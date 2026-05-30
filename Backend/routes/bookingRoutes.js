// routes/bookingRoutes.js

const express = require('express');

const router = express.Router();

const Booking = require('../models/Booking');

const Salon = require('../models/Salon');

const Notification =
  require('../models/Notification');

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

    return {

      hours,

      minutes:
        parseInt(minutes),

    };

  };



/*

GET USER BOOKINGS

*/

router.get(
  '/',
  protect,
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          userId:
            req.user._id,

        })

        .populate(

          'salonId',

          'name image address mapLink services ownerId'

        )

        .sort({

          createdAt: -1,

        });

      for (const booking of bookings) {

        if (
          booking.status ===
          'upcoming'
        ) {

          const {
            hours,
            minutes,
          } = convertTo24Hour(
            booking.bookingTime
          );

          const bookingDateTime =
            new Date(
              booking.bookingDate
            );

          bookingDateTime.setHours(
            hours,
            minutes,
            0,
            0
          );

          const now =
            new Date();

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

            serviceId:
              service || null,

          };

        });

      res.json(
        formattedBookings
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);



/*

GET PROVIDER BOOKINGS

*/
router.get(
  '/provider',
  protect,
  async (req, res) => {

    try {

      const salon =
        await Salon.findOne({

          ownerId: req.user._id,

        });

      if (!salon) {

        return res.status(404).json({

          message: 'Salon not found',

        });

      }

      const bookings =
        await Booking.find({

          salonId: salon._id,

        })

        .populate(
          'userId',
          'name email'
        )

        .sort({
          createdAt: -1,
        });

      const formattedBookings =
        bookings.map((booking) => {

          const service =
            salon.services.id(
              booking.serviceId
            );

          return {

            ...booking.toObject(),

            serviceData:
              service || null,

          };

        });

      res.json(
        formattedBookings
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

/*

CREATE BOOKING

*/

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

          status:
            'upcoming',

        });

      if (existingBooking) {

        return res.status(400).json({

          message:
            'Slot already booked',

        });

      }

      const {
        hours,
        minutes,
      } = convertTo24Hour(
        bookingTime
      );

      const bookingDateTime =
        new Date(
          bookingDate
        );

      bookingDateTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      const now =
        new Date();

      if (
        bookingDateTime <= now
      ) {

        return res.status(400).json({

          message:
            'Cannot book past time slots',

        });

      }

      const booking =
        await Booking.create({

          userId:
            req.user._id,

          salonId,

          serviceId,

          bookingDate,

          bookingTime,

        });

      const salon =
        await Salon.findById(
          salonId
        );

      const service =
        salon.services.id(
          serviceId
        );



      // USER NOTIFICATION

      await Notification.create({

        userId:
          req.user._id,

        targetRole:
          'user',

        title:
          'Booking Confirmed',

        message:
          `Your ${service.name} booking for ${bookingTime} on ${bookingDate} is confirmed.`,

        type:
          'booking_confirmed',

        bookingId:
          booking._id,

      });



      // PROVIDER NOTIFICATION

      await Notification.create({

        userId:
          salon.ownerId,

        targetRole:
          'provider',

        title:
          'New Booking Received',

        message:
          `${service.name} booked for ${bookingTime} on ${bookingDate}.`,

        type:
          'booking_received_provider',

        bookingId:
          booking._id,

      });

      res.status(201).json(
        booking
      );

    } catch (error) {

      console.log(error);

      console.log(req.body);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);



/*

USER CANCEL BOOKING

*/

router.put(
  '/:id/cancel',
  protect,
  async (req, res) => {

    try {

      const booking =
        await Booking.findOne({

          _id:
            req.params.id,

          userId:
            req.user._id,

        });

      if (!booking) {

        return res.status(404).json({

          message:
            'Booking not found',

        });

      }

      const {
        hours,
        minutes,
      } = convertTo24Hour(
        booking.bookingTime
      );

      const bookingDateTime =
        new Date(
          booking.bookingDate
        );

      bookingDateTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      const now =
        new Date();

      const differenceHours =
        (bookingDateTime - now) /
        (1000 * 60 * 60);

      if (
        differenceHours < 3
      ) {

        return res.status(400).json({

          message:
            'Cannot cancel within 3 hours of slot time',

        });

      }

      booking.status =
        'cancelled';

      await booking.save();

      const salon =
        await Salon.findById(
          booking.salonId
        );

      const service =
        salon.services.id(
          booking.serviceId
        );



      // USER NOTIFICATION

      await Notification.create({

        userId:
          req.user._id,

        targetRole:
          'user',

        title:
          'Booking Cancelled',

        message:
          `Your ${service.name} booking for ${booking.bookingTime} on ${booking.bookingDate} was cancelled successfully.`,

        type:
          'booking_cancelled_user',

        bookingId:
          booking._id,

      });



      // PROVIDER NOTIFICATION

      await Notification.create({

        userId:
          salon.ownerId,

        targetRole:
          'provider',

        title:
          'Booking Cancelled',

        message:
          `Customer cancelled ${service.name} booking for ${booking.bookingTime} on ${booking.bookingDate}.`,

        type:
          'booking_cancelled_user',

        bookingId:
          booking._id,

      });

      res.json({

        message:
          'Booking cancelled',

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);



/*

PROVIDER CANCEL BOOKING

*/

router.put(
  '/:id/provider-cancel',
  protect,
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            'Booking not found',

        });

      }

      const salon =
        await Salon.findById(
          booking.salonId
        );

      if (

        !salon ||

        salon.ownerId.toString() !==
        req.user._id.toString()

      ) {

        return res.status(401).json({

          message:
            'Unauthorized',

        });

      }

      const {
        hours,
        minutes,
      } = convertTo24Hour(
        booking.bookingTime
      );

      const bookingDateTime =
        new Date(
          booking.bookingDate
        );

      bookingDateTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      const now =
        new Date();

      const differenceHours =
        (bookingDateTime - now) /
        (1000 * 60 * 60);

      if (
        differenceHours < 3
      ) {

        return res.status(400).json({

          message:
            'Cannot cancel within 3 hours of slot time',

        });

      }

      booking.status =
        'cancelled';

      await booking.save();

      const service =
        salon.services.id(
          booking.serviceId
        );



      // USER NOTIFICATION

      await Notification.create({

        userId:
          booking.userId,

        targetRole:
          'user',

        title:
          'Booking Cancelled By Salon',

        message:
          `Your ${service.name} appointment at ${booking.bookingTime} on ${booking.bookingDate} was cancelled by the salon.`,

        type:
          'booking_cancelled_provider',

        bookingId:
          booking._id,

      });



      // PROVIDER NOTIFICATION

      await Notification.create({

        userId:
          req.user._id,

        targetRole:
          'provider',

        title:
          'Booking Cancelled',

        message:
          `You cancelled ${service.name} booking for ${booking.bookingTime} on ${booking.bookingDate}.`,

        type:
          'booking_cancelled_provider',

        bookingId:
          booking._id,

      });

      res.json({

        message:
          'Booking cancelled by provider',

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);



/*

RATE BOOKING

*/

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

        message:
          error.message,

      });

    }

  }
);

module.exports = router;