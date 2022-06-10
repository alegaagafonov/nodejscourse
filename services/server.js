import 'dotenv/config';

import express from 'express';
import { MongoDatabaseClient } from "../libs/db.js";
import { ObjectId } from "mongodb";
import { PORT } from '../config.js';

const app = express();
const mongoClient = new MongoDatabaseClient();
await mongoClient.connect();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const result = await mongoClient.getEntries()
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

app.post('/create', async (req, res) => {
    try {
        const todo = req.body;

        await mongoClient.insertEntry(todo);

        res.send(todo);
    } catch (err) {
        res.sendStatus(500);
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const update = req.body;
        const query = { _id: new ObjectId(req.params.id) };
        console.log(query);
        console.log(update);

        const result = await mongoClient.updateEntry(query, update);

        res.send(result)
    } catch (err) {
        res.sendStatus(500);
    }
});

app.patch('/complete/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const todo = await mongoClient.getEntry(query);
        const result = await mongoClient.updateEntry(query, { done: !todo.done });

        res.send(result)
    } catch (err) {
        res.sendStatus(500);
    }
});


app.delete('/delete/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const result = await mongoClient.deleteEntry(query);

        res.send(result)
    } catch (err) {
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

