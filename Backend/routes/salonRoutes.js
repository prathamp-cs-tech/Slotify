// routes/salonRoutes.js

const express = require('express');

const router = express.Router();

const Salon = require('../models/Salon');

const Booking = require('../models/Booking');

const {
  protect,
} = require('../middleware/authMiddleware');

const DEFAULT_SLOTS = [
  
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '1:00 pm',
  '1:30 pm',
  '4:00 pm',
  '4:30 pm',
  '5:00 pm',
  '5:30 pm',

];

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
      minutes: parseInt(minutes),
    };

  };

router.get('/', async (req, res) => {

  try {

    const salons =
      await Salon.find().lean();

    res.json(salons);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get(
  '/provider/my-salon',
  protect,
  async (req, res) => {

    try {

      const salon =
        await Salon.findOne({
          ownerId: req.user._id,
        }).lean();

      if (!salon) {

        return res.status(404).json({
          message: 'Salon not found',
        });

      }

      res.json(salon);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.post(
  '/provider/add-service',
  protect,
  async (req, res) => {

    try {

      const {
        name,
        category,
        price,
        duration,
        image,
      } = req.body;

      const salon =
        await Salon.findOne({
          ownerId: req.user._id,
        });

      if (!salon) {

        return res.status(404).json({
          message: 'Salon not found',
        });

      }

      salon.services.push({

        name,
        category,
        price,
        duration,
        image,
        averageRating: 0,
        totalRatings: 0,

      });

      await salon.save();

      res.status(201).json({
        message: 'Service added',
        salon,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.put(
  '/provider/service/:serviceId',
  protect,
  async (req, res) => {

    try {

      const {
        serviceId,
      } = req.params;

      const {
        name,
        category,
        price,
        duration,
        isActive,
        image,
      } = req.body;

      const salon =
        await Salon.findOne({
          ownerId: req.user._id,
        });

      if (!salon) {

        return res.status(404).json({
          message: 'Salon not found',
        });

      }

      const service =
        salon.services.id(serviceId);

      if (!service) {

        return res.status(404).json({
          message: 'Service not found',
        });

      }

      service.name = name;
      service.category = category;
      service.price = price;
      service.duration = duration;
      service.isActive = isActive;
      service.image = image;

      await salon.save();

      res.json({
        message: 'Service updated',
        salon,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.delete(
  '/provider/service/:serviceId',
  protect,
  async (req, res) => {

    try {

      const {
        serviceId,
      } = req.params;

      const salon =
        await Salon.findOne({
          ownerId: req.user._id,
        });

      if (!salon) {

        return res.status(404).json({
          message: 'Salon not found',
        });

      }

      salon.services =
        salon.services.filter(
          service =>
            service._id.toString() !==
            serviceId
        );

      await salon.save();

      res.json({
        message: 'Service deleted',
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.get(
  '/:salonId/service/:serviceId/slots',
  async (req, res) => {

    try {

      const {
        salonId,
        serviceId,
      } = req.params;

      const {
        date,
      } = req.query;

      const salon =
        await Salon.findById(salonId);

      if (!salon) {

        return res.status(404).json({
          message: 'Salon not found',
        });

      }

      const service =
        salon.services.id(serviceId);

      if (!service) {

        return res.status(404).json({
          message: 'Service not found',
        });

      }

      const blockedDate =
        service.blockedSlots.find(
          item => item.date === date
        );

      const blockedSlots =
        blockedDate
          ? blockedDate.slots
          : [];

      const bookings =
        await Booking.find({

          salonId,
          serviceId,
          bookingDate: date,
          status: 'upcoming',

        });

      const bookedSlots =
        bookings.map(
          booking => booking.bookingTime
        );

      const now = new Date();

      const selectedDateObj =
        new Date(date);

      const availableSlots =
        DEFAULT_SLOTS.filter(
          (slot) => {

            if (
              blockedSlots.includes(slot) ||
              bookedSlots.includes(slot)
            ) {

              return false;

            }

            const isToday =

              now.toDateString() ===
              selectedDateObj.toDateString();

            if (!isToday) {

              return true;

            }

            const {
              hours,
              minutes,
            } = convertTo24Hour(slot);

            const slotDateTime =
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hours,
                minutes,
                0,
                0
              );

            const diffMs =
              slotDateTime - now;

            const diffHours =
              diffMs / (1000 * 60 * 60);

            return diffHours >= 1;

          }
        );

      res.json({

        availableSlots,
        blockedSlots,
        bookedSlots,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;