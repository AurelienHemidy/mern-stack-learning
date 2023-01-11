const express = require('express');
const WorkoutModel = require('../models/workoutModel');
const {
  createWorkout,
  getAllWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getAllWorkout);

// GET Single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;
