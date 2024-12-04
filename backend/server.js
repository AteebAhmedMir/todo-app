const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

// Configure CORS to allow requests from specific origin (e.g., frontend on http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if different
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
  credentials: true // Allow cookies or credentials (optional)
}));

app.use(bodyParser.json());

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User registered successfully.', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.', error });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error });
  }
});

// Add task route
app.post('/tasks', async (req, res) => {
  const { userId, taskName } = req.body;

  if (!userId || !taskName) {
    return res.status(400).json({ message: 'User ID and task name are required.' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        name: taskName,
        userId: parseInt(userId),
      },
    });
    res.status(201).json({ message: 'Task created successfully.', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task.', error });
  }
});

// Get tasks for a user
app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks.', error });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
