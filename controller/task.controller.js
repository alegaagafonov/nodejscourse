const Task = require("../models/task");

const fetchTasks = async (req, res) => {
    const taskQuery = Task.find();

    try {
        const tasksInfo = await taskQuery;

        if (tasksInfo.length) {
            res.status(200).send({
                tasks: tasksInfo.map(task => ({
                    id: task._id,
                    done: task.done,
                    label: task.label
                })),
                amount: tasksInfo.length,
                msg: 'Tasks are successfully fetched!'
            });
        } else {
            res.status(200).send({
                msg: 'Task list is empty',
            })
        }
    } catch (err) {
        res.status(400).send({
            msg: 'Something went wrong!',
            details: err.message
        });
    }
};

const createTask = async (req, res) => {
    const taskData = req.body;

    const task = new Task({
        label: taskData.label,
        done: taskData.done
    });

    try {
        const taskInfo = await task.save();

        res.status(200).send({
            msg: 'Task is successfully created!',
            task: {
                id: taskInfo._id,
                label: taskInfo.label,
                done: taskInfo.done
            }
        });
    } catch (err) {
        res.status(400).send({
            msg: "An error occurred during task creation!"
        })
    }
}

const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const taskInfo = await Task.deleteOne({ _id: taskId });

        if (taskInfo.deletedCount) {
            res.status(200).send({
                msg: `Task with ${taskId} is successfully deleted!`
            });
        } else {
            res.status(400).send({
                msg: `Task with id ${taskId} was not found!`
            });
        }
    } catch (err) {
        res.status(400).send({
            msg: err.message
        });
    }
};

const updateTask = async (req, res) => {
    const taskData = req.body;

    const task = new Task({
        _id: taskData.id,
        label: taskData.label,
        done: taskData.done
    });

    try {
        const taskInfo = await Task.updateOne({ _id: taskData.id }, task);

        res.status(200).send({
            msg: `Task with id ${taskData.id} is successfully updated!`,
            task: taskInfo
        });
    } catch (err) {
        res.status(400).send({
            msg: 'Error during task updating!',
            details: err.message
        });
    }
};

const changeTaskStatus = async (req, res) => {
    const taskInfo = req.body;

    const task = new Task({
        _id: taskInfo.id,
        done: taskInfo.done
    });

    try {
        await Task.updateOne({ _id: taskInfo.id }, task);

        res.status(200).send({
            msg: `Task with id ${taskInfo.id} is successfully changed!`,
        });
    } catch (err) {
        res.status(400).send({
            msg: 'Error during status changing!',
            details: err.message
        });
    }
}

module.exports = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
    changeTaskStatus
};
