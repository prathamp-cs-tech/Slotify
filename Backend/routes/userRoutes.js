const express = require('express');

const router = express.Router();

const User = require('../models/User');

const {
  protect,
} = require('../middleware/authMiddleware');

router.put(
  '/profile',
  protect,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({
          message: 'User not found',
        });

      }

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      user.phone =
        req.body.phone ||
        '';

      user.location =
        req.body.location ||
        '';

      const updatedUser =
        await user.save();

      res.json({

        _id:
          updatedUser._id,

        name:
          updatedUser.name,

        email:
          updatedUser.email,

        role:
          updatedUser.role,

        phone:
          updatedUser.phone,

        location:
          updatedUser.location,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;