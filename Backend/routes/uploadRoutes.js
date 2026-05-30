// routes/uploadRoutes.js

const express =
  require('express');

const router =
  express.Router();

const upload =
  require(
    '../middleware/uploadMiddleware'
  );

const {
  protect,
} = require(
  '../middleware/authMiddleware'
);

router.post(

  '/',

  protect,

  upload.single('image'),

  async (req, res) => {

    try {
        console.log(req.file);

      res.json({

        image:
          req.file.path,

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

module.exports =
  router;