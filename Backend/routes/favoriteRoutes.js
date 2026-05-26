const express = require('express');

const router = express.Router();

const Favorite = require('../models/Favorite');

router.get('/', async (req, res) => {

  try {

    const favorites = await Favorite.find()
      .populate('salonId');

    res.json(favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.post('/', async (req, res) => {

  try {

    const existing = await Favorite.findOne({
      salonId: req.body.salonId,
    });

    if (existing) {

      return res.status(400).json({
        message: 'Already favorited',
      });

    }

    const favorite = await Favorite.create({
      salonId: req.body.salonId,
    });

    res.status(201).json(favorite);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.delete('/:salonId', async (req, res) => {

  try {

    await Favorite.findOneAndDelete({
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

});

module.exports = router;