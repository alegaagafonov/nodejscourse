const express = require('express');
const taskRouter = express.Router();

taskRouter.get('/', (req, res, next) => {
    console.log('TASKS FETCHED!');

    res.status(200).send({
       msg: 'Tasks are successfully fetched!'
    });
});

taskRouter.post('/create', (req, res, next) => {
    console.log('TASKS UPDATED!');

    res.status(200).send({
        msg: 'Tasks are successfully created!'
    });
});

taskRouter.delete('/delete', (req, res, next) => {
    console.log('TASKS DELETED!');

    res.status(200).send({
        msg: 'Tasks are successfully deleted!'
    });
});

taskRouter.put('/update', (req, res, next) => {
    console.log('TASKS UPDATED!');

    res.status(200).send({
        msg: 'Tasks are successfully updated!'
    });
});

taskRouter.put('/complete', (req, res, next) => {
    console.log('TASK STATUS IS CHANGED!');

    res.status(200).send({
        msg: 'Task status is changed!'
    });
});

module.exports = taskRouter;
