const taskController = require('../controllers/taskController');

const taskRoutes = (req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        taskController.getTasks(req, res);
    } else if (req.method === 'POST' && req.url === '/tasks') {
        taskController.createTask(req, res);
    } else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
        taskController.updateTask(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
        taskController.deleteTask(req, res);
    }
};

module.exports = taskRoutes;