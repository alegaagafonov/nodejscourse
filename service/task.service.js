const Task = require('../models/task');

class TaskService {
    async getTasks() {
        return (await Task.find());
    }

    async createTask(taskInfo) {
        const taskModel = new Task({
            label: taskInfo.label,
            done: taskInfo.done
        });

        return await taskModel.save();
    }

    async deleteTask(id) {
        return (await Task.deleteOne({ _id: id }));
    }

    async updateTask(updatedTask) {
        const task = new Task({
            _id: updatedTask.id,
            label: updatedTask.label,
            done: updatedTask.done
        });

        return (await Task.updateOne({ _id: updatedTask.id }, task));
    }

    async changeTaskStatus(taskData) {
        const task = new Task({
            _id: taskData.id,
            done: taskData.done
        });

        return (await Task.updateOne({ _id: taskData.id }, task));
    }
}

module.exports = new TaskService();
