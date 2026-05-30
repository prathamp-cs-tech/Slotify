// routes/notificationRoutes.js

const express = require('express');

const router = express.Router();

const Notification =
  require('../models/Notification');

const {
  protect,
} = require('../middleware/authMiddleware');



/*

GET USER NOTIFICATIONS

*/

router.get(
  '/',
  protect,
  async (req, res) => {

    try {

      const notifications =

        await Notification.find({

          userId:
            req.user._id,

          targetRole:
            'user',

        })

        .sort({

          createdAt: -1,

        });

      res.json(
        notifications
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

GET PROVIDER NOTIFICATIONS

*/

router.get(
  '/provider',
  protect,
  async (req, res) => {

    try {

      const notifications =

        await Notification.find({

          userId:
            req.user._id,

          targetRole:
            'provider',

        })

        .sort({

          createdAt: -1,

        });

      res.json(
        notifications
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

MARK SINGLE USER NOTIFICATION AS READ

*/

router.put(
  '/:id/read',
  protect,
  async (req, res) => {

    try {

      const notification =

        await Notification.findOne({

          _id:
            req.params.id,

          userId:
            req.user._id,

        });

      if (!notification) {

        return res.status(404).json({

          message:
            'Notification not found',

        });

      }

      notification.isRead =
        true;

      await notification.save();

      res.json({

        message:
          'Notification marked as read',

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

MARK ALL USER NOTIFICATIONS AS READ

*/

router.put(
  '/read-all',
  protect,
  async (req, res) => {

    try {

      await Notification.updateMany(

        {

          userId:
            req.user._id,

          targetRole:
            'user',

          isRead:
            false,

        },

        {

          isRead:
            true,

        }

      );

      res.json({

        message:
          'All notifications marked as read',

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

MARK ALL PROVIDER NOTIFICATIONS AS READ

*/

router.put(
  '/provider/read-all',
  protect,
  async (req, res) => {

    try {

      await Notification.updateMany(

        {

          userId:
            req.user._id,

          targetRole:
            'provider',

          isRead:
            false,

        },

        {

          isRead:
            true,

        }

      );

      res.json({

        message:
          'All provider notifications marked as read',

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