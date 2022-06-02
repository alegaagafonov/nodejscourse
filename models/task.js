const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const taskSchema = mongoose.Schema({
    id: { type: Number, require: true },
    label: { type: String, require: true },
    done: { type: Boolean, require: true },
});

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);
