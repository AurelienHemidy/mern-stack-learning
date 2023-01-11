require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Use the routes
app.use(process.env.API_URL, workoutRoutes);

// Connect to db
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database & listening on port ' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
