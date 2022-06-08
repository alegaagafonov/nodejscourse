const express = require('express');
const taskRouter = express.Router();
const {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
    changeTaskStatus
} = require('./../controller/task.controller');

taskRouter.get('/', fetchTasks);
taskRouter.post('/create', createTask);
taskRouter.delete('/delete/:id', deleteTask);
taskRouter.put('/update', updateTask);
taskRouter.put('/complete', changeTaskStatus);

module.exports = taskRouter;
