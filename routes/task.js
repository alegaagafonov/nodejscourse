const express = require('express');
const taskRouter = express.Router();
const {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
    changeTaskStatus
} = require('./../controller/task.controller');

// /tasks/ => GET
taskRouter.get('/', fetchTasks);

// /tasks/create => POST
taskRouter.post('/create', createTask);

// /tasks/delete/id => DELETE
taskRouter.delete('/delete/:id', deleteTask);

// /tasks/update => PUT
taskRouter.put('/update', updateTask);

// /tasks/complete => PUT
taskRouter.put('/complete', changeTaskStatus);

module.exports = taskRouter;
