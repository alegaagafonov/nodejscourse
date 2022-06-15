const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

app.use(express.json());
const port = 3001;
const DB_NAME = "base_name";

const uri = `mongodb://mongodb:27017/${DB_NAME}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log(`MongoDB connection established`));

app.use(routes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
