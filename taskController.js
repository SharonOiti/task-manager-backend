const fs = require('fs');
const path = './data/tasks.json';
const { v4: uuidv4 } = require('uuid');  // For generating unique IDs

// Function to load tasks from the file
const loadTasks = () => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading tasks:', err);
    return { tasks: [] };
  }
};

// Function to save tasks to the file
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error saving tasks:', err);
  }
};

// Get all tasks
const getTasks = (req, res) => {
  const tasks = loadTasks();
  res.json(tasks.tasks);
};

// Get a task by ID
const getTaskById = (req, res) => {
  const tasks = loadTasks();
  const task = tasks.tasks.find(t => t.id === req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

// Add a new task
const addTask = (req, res) => {
  const tasks = loadTasks();
  const { title, description, status } = req.body;
  const newTask = {
    id: uuidv4(),
    title,
    description,
    status: status || 'pending', // default status
  };
  tasks.tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
  const tasks = loadTasks();
  const taskIndex = tasks.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex !== -1) {
    const { title, description, status } = req.body;
    tasks.tasks[taskIndex] = {
      ...tasks.tasks[taskIndex],
      title,
      description,
      status
    };
    saveTasks(tasks);
    res.json(tasks.tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

// Delete a task
const deleteTask = (req, res) => {
  const tasks = loadTasks();
  const taskIndex = tasks.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex !== -1) {
    tasks.tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    res.status(204).end();  // No content to return
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};