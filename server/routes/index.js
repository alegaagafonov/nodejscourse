const express = require("express");
const { TodoItem } = require("../models/models");
const app = express();

app.get("/", async (req, res) => {
  const todoList = await TodoItem.find();

  try {
    res.send(todoList);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const item = new TodoItem(req.body);

  try {
    const todoList = await TodoItem.find({ id: req.body.id });
    if (todoList.length === 0) {
      await item.save();
      res.send(item);
    } else {
      res.status(409).send("Item have already exists!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/update/:id", async (req, res) => {
  const food = new TodoItem(req.body);
  try {
    const { label, done } = req.body;
    await TodoItem.findOneAndUpdate({ id: req.params.id }, { label, done });
    if (!item) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/complete/:id", async (req, res) => {
  try {
    await TodoItem.findOneAndUpdate(
      { id: req.params.id },
      { done: req.body.done }
    );
    res.status(200).send();
    if (!item) res.status(404).send("No item found");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const item = await TodoItem.deleteOne({ id: req.params.id });

    if (!item) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
