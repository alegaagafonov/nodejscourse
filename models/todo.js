import pkg from 'mongoose';
const { Schema, model } = pkg;

const schema = new Schema({
  label: { type: String, required: true },
  done: {type: Boolean}
})

export default model('Todo', schema)
