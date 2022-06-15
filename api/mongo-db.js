import { MongoClient } from "mongodb";

const uri = `mongodb://mongodb:27017/todos`;

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});