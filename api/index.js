import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { 
  completeTodo, 
  createTodo, 
  deleteTodo, 
  readTodos, 
  updateTodo 
} from "./routes/routes.js"
import { client } from "./mongo-db.js";

const PORT = process.env.PORT || 3000;

const app = express();
const jsonParser = bodyParser.json()

//middlewares
app.use(cors());

// Routes
app.get("/", readTodos);
app.post("/create", jsonParser, createTodo);
app.put("/update/:id", jsonParser, updateTodo);
app.put("/complete/:id", jsonParser, completeTodo);
app.delete("/delete/:id", deleteTodo);

async function start() {
  try {
    await client.connect();
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log('Server listening on ' + PORT);
    })
  } catch (err) {
    console.log(err)
  }
}

start();