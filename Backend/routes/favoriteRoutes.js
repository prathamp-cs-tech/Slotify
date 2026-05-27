// routes/favoriteRoutes.js

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

        })

        .populate(
          'salonId',
          'name image address services'
        )

        .sort({
          createdAt: -1,
        });

      const formattedFavorites =
        favorites.map((favorite) => {

          const salon =
            favorite.salonId;

          let service = null;

          if (
            salon &&
            salon.services
          ) {

            service =
              salon.services.find(

                item =>

                  item._id.toString() ===
                  favorite.serviceId.toString()

              );

          }

          return {

            ...favorite.toObject(),

            serviceId:
              service || null,

          };

        });

      res.json(
        formattedFavorites
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
      } = req.body;

      const existing =
        await Favorite.findOne({

          userId: req.user._id,

          salonId,

          serviceId,

        });

      if (existing) {

        return res.status(400).json({
          message:
            'Already favorited',
        });

      }

      const favorite =
        await Favorite.create({

          userId: req.user._id,

          salonId,

          serviceId,

        });

      res.status(201).json(
        favorite
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.delete(
  '/:favoriteId',
  protect,
  async (req, res) => {

    try {

      const favorite =
        await Favorite.findOne({

          _id: req.params.favoriteId,

          userId: req.user._id,

        });

      if (!favorite) {

        return res.status(404).json({
          message:
            'Favorite not found',
        });

      }

      await favorite.deleteOne();

      res.json({
        message:
          'Favorite removed',
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