import { Router } from 'express';
import Todo from '../models/todo.js';

export const routerTodo = Router();

routerTodo.post('/create', async (req, res) => {
  try {
    const {label, done} = req.body;

    const todo = new Todo({ label, done })
    await todo.save();

    res.status(200).json({ message: 'Item was added to list'});

  } catch (e) {
    res.status(500).json({ message: 'Smt went wrong!' })
  }
});

routerTodo.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ _id: 'desc'})

    res.status(200).json(todos);

  } catch (e) {
    res.status(500).json({ message: 'Smt went wrong!' })
  }
})

routerTodo.put('/update', async (req, res) => {
  try {
    const {id, label, done} = req.body;
    const todo = await Todo.findOne({ _id: id })
    await todo.updateOne({ label, done })

    res.status(200).json({ message: 'Item was updated'});

  } catch (e) {
    res.status(500).json({ message: 'Smt went wrong!' })
  }
});

routerTodo.delete('/delete/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await Todo.deleteOne({ _id: id});

    res.status(200).json({message: 'Item was deleted!'})


  } catch (e) {
    res.status(500).json({ message: 'Smt went wrong!' })
  }``
});

routerTodo.get('/complete/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findOne({ _id: id});
    await todo.updateOne({ done: true })

    res.status(200).json({message: 'Item was completed!'})


  } catch (e) {
    res.status(500).json({ message: 'Smt went wrong!' })
  }
});
