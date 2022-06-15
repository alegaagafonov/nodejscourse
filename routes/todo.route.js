import { Router } from 'express';
import Todo from '../models/Todo.js';

const router = Router();

router.post(
    '/create/:label',
    async (req, res) => {
        const { label } = req.params;

        try {
            const todo = new Todo({
                id: Date.now(),
                label: label.split('-').join(' '),
                done: false
            });

            await todo.save();

            res.status(201).send({ message: 'Todo created' });
        } catch(err) {
            console.error(err);
        };
    }
);

router.get(
    '/',
    async (req, res) => {
        try {
            const todos = await Todo.find();

            res.status(200).json((todos));
        } catch(err) {
            console.error(err);
        };
    }
);

router.patch(
    '/update/id=:todoId/:newLabel',
    async (req, res) => {
        const { todoId, newLabel } = req.params;

        try {
            const todo = await Todo.findOne({ id: todoId });

            await todo.updateOne({ label: newLabel.split('-').join(' ') });

            res.status(200).send({ message: 'Todo updated' });
        } catch(err) {
            console.error(err);
        };
    }
);

router.patch(
    '/complete/id=:todoId/:done',
    async (req, res) => {
        const { todoId, done } = req.params;

        try {
            const todo = await Todo.findOne({ id: todoId });

            await todo.updateOne({ done });

            res.status(200).send({ message: 'Todo updated' });
        } catch(err) {
            console.error(err);
        };
    }
);

router.delete(
    '/delete/id=:todoId',
    async (req, res) => {
        const { todoId } = req.params;

        try {
            const todo = await Todo.findOne({ id: todoId });

            await todo.deleteOne();

            res.status(200).send({ message: 'Todo deleted' });
        } catch(err) {
            console.error(err);
        };
    }
);

export default router;
