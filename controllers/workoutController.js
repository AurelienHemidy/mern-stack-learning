const WorkoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workout
const getAllWorkout = async (req, res) => {
  const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such workout' });

  const workout = await WorkoutModel.findById(id);
  if (!workout) return res.status(404).json({ error: 'No such workout' });

  res.status(200).json(workout);
};

// post a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await WorkoutModel.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such workout' });

  const workout = await WorkoutModel.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such workout' });

  const workout = await WorkoutModel.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }
  res.status(200).json(workout);
};

module.exports = {
  getAllWorkout,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
