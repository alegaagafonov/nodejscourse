const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = process.env.PORT || 5005;

const Todo = require("./todo.model");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => console.log(`MongoDB connection established`));

todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get((req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route("/add").post((req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => {
      res.status(400).send("Adding new todo failed");
    });
});

todoRoutes.route("/update/:id").post((req, res) => {
  const id = req.params.id;
  const name = req.query.name;
  const task = req.query.task;
  const complete = req.query.complete;
  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("data was not found");
    } else {
      todo.name = name;
      todo.task = task;
      todo.complete = complete;
      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

//TODO: Properly delete and respond.
todoRoutes.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) {
      res.status(400).send("No id here");
    } else {
      todo
        .deleteOne()
        .then(res.status(200))
        .catch((err) => {
          res.send("sorry boo");
        });
    }
  });
});

app.use("/todos", todoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`The server is running on PORT: ${PORT}`));
