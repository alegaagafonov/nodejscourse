import express from 'express'
import mongoose from 'mongoose';
import { routerTodo } from './routers/todos.router.js'
const app = express();

app.use(express.json({ extended: true }));

app.use('/api/todo', routerTodo);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.prfg4ub.mongodb.net/?retryWrites=true&w=majority')
    app.listen(5000, '', () => {
      console.log('App has been started')
    })
  } catch (e) {
    console.log(`Server error ${e.message}`)
  }
}

start();


