require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

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

app.use(
  '/api/auth',
  require('./routes/authRoutes')
);

app.use(
  '/api/bookings',
  require('./routes/bookingRoutes')
);

app.use(
  '/api/salons',
  require('./routes/salonRoutes')
);

app.use(
    '/api/provider',
    require('./routes/providerRoutes')
);

app.use(
    '/api/favorites',
    require('./routes/favoriteRoutes')
);

app.use(
      '/api/users',
      require('./routes/userRoutes')
);

app.use(
  '/api/notifications',
  require('./routes/notificationRoutes')
);

app.use(
  '/api/upload',
  require('./routes/uploadRoutes')
);


const PORT =
  process.env.PORT || 3001;

app.listen(
  PORT,
  '0.0.0.0',
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);