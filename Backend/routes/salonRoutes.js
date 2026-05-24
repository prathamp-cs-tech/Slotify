const express = require('express');
const router = express.Router();
const Salon = require('../models/Salon');

// GET ALL SALONS
router.get('/', async (req, res) => {
    try {
        const salons = await Salon.find();
        res.json(salons);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


// CREATE SALON
router.post('/', async (req, res) => {
    try {
        const salon = await Salon.create(req.body);
        res.status(201).json(salon);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;