const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,

    email: {
        type: String,
        unique: true,
    },

    password: String,

});

module.exports = mongoose.model(
    'User',
    userSchema
);

const Salon = require('./models/Salon');

app.get('/create', async (req, res) => {

    const salon = await Salon.create({
        name: 'Royal Salon',
        service: 'Haircut',
        price: 300,
        rating: 4.5,
        image: 'test',
    });

    res.json(salon);

});