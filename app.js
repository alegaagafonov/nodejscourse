const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./db');
const taskRouter = require('./routes/task');

const app = express();

mongoDB.initConnection();

app.use(bodyParser.json());

app.use('/tasks', taskRouter);

app.use((req, res, next) => {
    console.log('Hello from todos api!');
    next();
});

app.listen(5000);
