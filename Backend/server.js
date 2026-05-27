const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Salon = require('./models/Salon');
const salonRoutes = require('./routes/salonRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes =require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/salons', salonRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
console.log('Salon routes loaded');

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// const Salon = require('./models/Salon');

// app.get('/create', async (req, res) => {

//     const salon = await Salon.create({
//         name: 'Royal Salon',
//         service: 'Haircut',
//         price: 300,
//         rating: 4.5,
//         image: 'test',
//     });

//     res.json(salon);

// });

// app.get('/seed', async (req, res) => {

//     try {

//         await Salon.deleteMany();

//         const salons = await Salon.insertMany([

//             {
//                 name: 'Classic Cuts',
//                 service: 'Haircut',
//                 price: 250,
//                 rating: 4.3,
//                 image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
//             },

//             {
//                 name: 'Glam Studio',
//                 service: 'Makeup',
//                 price: 450,
//                 rating: 4.7,
//                 image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
//             },

//             {
//                 name: 'Serenity Spa',
//                 service: 'Spa',
//                 price: 600,
//                 rating: 4.6,
//                 image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15',
//             },

//         ]);

//         res.json(salons);

//     } catch (error) {

//         res.status(500).json({
//             message: error.message,
//         });

//     }

// });

app.get('/test', (req, res) => {

    res.send('TEST WORKING');

});