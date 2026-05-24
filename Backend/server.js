const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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