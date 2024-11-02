const fs = require('fs');
const path = require('path');
const formidable = require('formidable').IncomingForm;
const fileHandler = require('../utils/fileHandler');
const filePath = path.join(__dirname, '../data/tasks.json');

// GET: Retrieve all tasks
const getTasks = (req, res) => {
    const tasks = fileHandler.readTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

// POST: Create a new task with optional image upload
const createTask = (req, res) => {
    const form = new formidable({ uploadDir: './uploads', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error uploading file' }));
            return;
        }

        const tasks = fileHandler.readTasks();
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields.description,
            status: fields.status || 'pending',
            image: files.image ? files.image.filepath : null
        };

        tasks.push(newTask);
        fileHandler.writeTasks(tasks);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

// PUT: Update an existing task
const updateTask = (req, res) => {
    const taskId = parseInt(req.url.split('/').pop());
    const tasks = fileHandler.readTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
        return;
    }

    const form = new formidable({ uploadDir: './uploads', keepExtensions: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error uploading file' }));
            return;
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: fields.title || tasks[taskIndex].title,
            description: fields.description || tasks[taskIndex].description,
            status: fields.status || tasks[taskIndex].status,
            image: files.image ? files.image.filepath : tasks[taskIndex].image
        };

        fileHandler.writeTasks(tasks);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks[taskIndex]));
    });
};

// DELETE: Remove a task
const deleteTask = (req, res) => {
    const taskId = parseInt(req.url.split('/').pop());
    let tasks = fileHandler.readTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
        return;
    }

    tasks = tasks.filter(task => task.id !== taskId);
    fileHandler.writeTasks(tasks);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Task deleted successfully' }));
};

module.exports = { getTasks, createTask, updateTask, deleteTask };