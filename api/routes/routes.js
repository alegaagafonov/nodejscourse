import _ from "lodash";
import { ObjectId } from "mongodb";
import { client } from "../mongo-db.js";

const dbname = "todos";
const db = client.db(dbname);
const collection = db.collection("todo-list");

export async function readTodos(_req, res) {
  const findResult = await collection.find().toArray();
  res.send(findResult);
}

export async function createTodo(req, res) {
  const { name, task } = req.body;

  if (!name || !_.isString(name)) return res.sendStatus(400);

  const toDo = {
    name: name,
    task: task || "",
    complete: false
  }

  const createResult = await collection.insertOne(toDo);

  const findResult = await collection.findOne(createResult.insertedId);
  res.send(findResult);
}

export async function updateTodo(req, res) {
  const { id } = req.params;

  const { name, task } = req.body;

  if (!name || !_.isString(name)) return res.sendStatus(400);

  const updateResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, task } }
  );

  const findResult = await collection.findOne({ _id: new ObjectId(id) });
  res.send(findResult);
}

export async function completeTodo(req, res) {
  const { id } = req.params;

  const { complete } = req.body;

  if (!_.isBoolean(complete)) return res.sendStatus(400);

  const completeResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { complete } }
  );

  const findResult = await collection.findOne({ _id: new ObjectId(id) });
  res.send(findResult);
}

export async function deleteTodo(req, res) {
  const { id } = req.params;

  const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
  if (!deleteResult.deletedCount) return res.sendStatus(404);

  const findResult = await collection.find().toArray();
  res.send(findResult);
}