import express from 'express';
import mongoose from 'mongoose';
import router from './routes/todo.route.js';

const index = express();

const PORT = process.env.PORT ?? 4000;

index.use(express.json());
index.use('/api', router);

const start = async () => {
    try {
        await mongoose
            .connect('mongodb+srv://admin:12345@cluster0.smrav.mongodb.net/Lohika?retryWrites=true&w=majority');

        index.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    } catch(err) {
        console.error(err);
    }
};

start();
