 **Personal Task Manager API**
- Simple Task Manager API is a Node.js-based API designed to manage personal tasks with CRUD(Create, Read, Update, Delete) functionality. This API stores tasks in a JSON file and includes optional image upload support for each task. The server uses the native HTTP module, with routes configured based on request type and URL.
## Features
- Retrieve All Tasks: Fetch all tasks stored in the JSON file.
- Create a New Task: Add tasks with title, description, status (default is "pending"), and optional image upload.
- Update an Existing Task: Modify task details such as title, description, status, and image.
- Delete a Task: Remove a task by its unique ID.
- Static File Serving: Serves a main HTML page located at the root URL.
## Project Structure
Task-API/
│
├── controllers/
│   └── tasksController.js             # Handles CRUD operations
├── data/
│   └── tasks.json.js                  # JSON file for storing tasks
├── routes/
│   └── taskRoutes.js                  # Routes for task endpoints
├── utils
│    └── fileHandler.js                # Utility to handle reading/writing tasks
├── uploads/                           # Folder for uploaded images
│             
├── views/                             # Folder for HTML views
│                
├── app.js                            # main server files
│ 
├── package.json                      # projct metadata and dependensies
│              
└── README.md                         # Project documentation

# Getting Started
# Prerequisites
- Node.js installed on your system.
# Installation
1. **Clone the repository:**
git clone https://github.com/Abdizalan/TASKFY.git
2. **Navigate to the project directory:**
cd TASKFY
3. **Install the dependencies:**
npm install
# Running the Server
**Start the server by running:**
node app.js
The server will run on port 9000. You can access it at http://localhost:9000.
# API Endpoints
1. **GET /tasks - Retrieve all tasks**
# Response: JSON array of all tasks
2. **POST /tasks - Create a new task with optional image upload**
# Request: Form data with fields:
- title (string) - Title of the task
- description (string) - Description of the task
- status (string, optional) - Task status (default: "pending")
- image (file, optional) - Image file for the task
# Response: JSON of the newly created task
3. **PUT /tasks/**
- Update an existing task
# Request: Form data with fields (optional):
- title (string) - New title
- description (string) - New description
- status (string) - Updated status
- image (file) - New image file for the task
# Response: JSON of the updated task or an error if not found
4. **DELETE /tasks/**
- Delete a specific task
# Response: Success message or error if task not found
# Dependencies
# formidable - For handling file uploads
# fs and path - For file system and path management
**License**
- This project is licensed under the MIT License.
