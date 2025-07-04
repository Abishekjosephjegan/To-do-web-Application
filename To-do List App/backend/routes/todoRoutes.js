const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo.js');
const auth = require('../middleware/auth.js');

// All routes use auth middleware
router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = new Todo({ text: req.body.text, userId: req.user.id });
  await todo.save();
  res.json(todo);
});

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a todo
router.post('/', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

// Update (toggle complete)
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Edit todo
router.patch('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.text = req.body.text;
  await todo.save();
  res.json(todo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;