import pkg from 'mongoose';

const { Schema, model } = pkg;

const schema = Schema({
    id: { type: Number, required: true, unique: true },
    label: {type: String, required: true },
    done: { type: Boolean, ref: 'false' }
});

export default model('Todo', schema);
