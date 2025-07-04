const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ...existing code...

mongoose.connect('mongodb://localhost:27017/todo_db')
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log(err));

const authRoutes = require('./routes/auth.js');
app.use('/api/auth', authRoutes);

// Routes
const todoRoutes = require('./routes/todoRoutes.js');
app.use('/api/todos', todoRoutes);

