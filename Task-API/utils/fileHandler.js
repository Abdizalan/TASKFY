const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/tasks.json');

// Ensure tasks.json exists; if not, create it with an empty array
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Read tasks from JSON file
const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading tasks:', err);
        return [];
    }
};

// Write tasks to JSON file
cons writeTasks = (tasks) => {.
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.error('Error writing to tasks file:', err);
    }
};

module.exports = { readTasks, writeTasks };
