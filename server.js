const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import task routes from the controller
const taskController = require('./taskController');

// Set up routes for tasks
app.get('/tasks', taskController.getTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.post('/tasks', taskController.addTask);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

// Add a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});