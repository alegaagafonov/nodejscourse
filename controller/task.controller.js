const Task = require("../models/task");

const fetchTasks = (req, res) => {
    const taskQuery = Task.find();

    taskQuery.then((response) => {

        if (response.length) {
            res.status(200).send({
                tasks: response.map(task => ({
                    id: task._id,
                    done: task.done,
                    label: task.label
                })),
                amount: response.length,
                msg: 'Tasks are successfully fetched!'
            });
        } else {
            res.status(200).send({
                msg: 'Task list is empty',
            })
        }
    }).catch((err) => {
        res.status(400).send({
            msg: 'Something went wrong!',
            details: err.message
        });
    });
};

const createTask = (req, res) => {
    const taskData = req.body;

    const task = new Task({
        label: taskData.label,
        done: taskData.done
    });

    task.save().then((response) => {
        res.status(200).send({
            msg: 'Task is successfully created!',
            task: {
                id: response._id,
                label: response.label,
                done: response.done
            }
        });
    }).catch(() => {
        res.status(400).send({
            msg: "An error occurred during task creation!"
        })
    });
}

const deleteTask = (req, res) => {
    const taskId = req.params.id;

    Task.deleteOne({
        _id: taskId
    }).then(
        (response) => {
            if (response.deletedCount) {
                res.status(200).send({
                    msg: `Task with ${taskId} is successfully deleted!`
                });
            } else {
                res.status(400).send({
                    msg: `Task with id ${taskId} was not found!`
                });
            }
        }
    ).catch(
        (err) => {
            res.status(400).send({
                msg: err.message
            });
        }
    );
};

const updateTask = (req, res) => {
    const taskData = req.body;

    const task = new Task({
        _id: taskData.id,
        label: taskData.label,
        done: taskData.done
    });

    Task.updateOne({
        _id: taskData.id
    }, task).then(
        (response) => {
            res.status(200).send({
                msg: `Task with id ${taskData.id} is successfully updated!`
            });
        }
    ).catch(
        (err) => {
            res.status(400).send({
                msg: 'Error during task updating!',
                details: err.message
            });
        }
    );
};

const changeTaskStatus = (req, res) => {
    const taskInfo = req.body;

    const task = new Task({
        _id: taskInfo.id,
        done: taskInfo.done
    });

    Task.updateOne({
        _id: taskInfo.id
    }, task).then(
        (response) => {
            res.status(200).send({
                msg: `Task with id ${taskInfo.id} is successfully changed!`
            });
        }
    ).catch(
        (err) => {
            res.status(400).send({
                msg: 'Error during status changing!',
                details: err.message
            });
        }
    );
}

module.exports = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
    changeTaskStatus
};
