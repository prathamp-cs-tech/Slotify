const express = require('express');

const router = express.Router();

const Salon = require('../models/Salon');

const {
  protect,
} = require('../middleware/authMiddleware');

router.get(
  '/my-salon',
  protect,
  async (req, res) => {

    try {

      const salon =
        await Salon.findOne({
          ownerId: req.user._id,
        });

      res.json(salon);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.post(
  '/services',
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

      let salon =
        await Salon.findOne({
          ownerId: req.user._id,
        });

      if (!salon) {

        salon = await Salon.create({

          ownerId: req.user._id,

          name:
            `${req.user.name}'s Salon`,

          image:
            image ||
            'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',

          services: [],

        });

      }

      salon.services.push({

        name,

        category,

        price: Number(price),

        duration: Number(duration),

        image:
          image || salon.image,

        isActive: true,

        averageRating: 0,

        totalRatings: 0,

        blockedSlots: [],

      });

      await salon.save();

      res.status(201).json({
        message:
          'Service added successfully',
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
    '/services/:serviceId',
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
          blockedSlots,
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
  
        service.set({
  
          name,
  
          category,
  
          price: Number(price),
  
          duration: Number(duration),
  
          isActive,
  
          blockedSlots,
  
        });
  
        salon.markModified('services');
  
        await salon.save();
  
        res.json({
  
          message:
            'Service updated successfully',
  
          service,
  
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