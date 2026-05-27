const express = require('express');

const router = express.Router();

const Favorite = require('../models/Favorite');

const {
  protect,
} = require('../middleware/authMiddleware');

router.get(
  '/',
  protect,
  async (req, res) => {

    try {

      const favorites =
        await Favorite.find({

          userId: req.user._id,

        }).populate('salonId');

      res.json(favorites);

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

      const existing =
        await Favorite.findOne({

          userId: req.user._id,

          salonId: req.body.salonId,

        });

      if (existing) {

        return res.status(400).json({
          message: 'Already favorited',
        });

      }

      const favorite =
        await Favorite.create({

          userId: req.user._id,

          salonId: req.body.salonId,

        });

      res.status(201).json(
        favorite
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.delete(
  '/:salonId',
  protect,
  async (req, res) => {

    try {

      await Favorite.findOneAndDelete({

        userId: req.user._id,

        salonId: req.params.salonId,

      });

      res.json({
        message: 'Favorite removed',
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;