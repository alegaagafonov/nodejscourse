const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

app.use(express.json());
const port = 3006;

const login = "login";
const password = "password";
const DB_NAME = "base_name";

const uri = `mongodb+srv://${login}:${password}@cluster.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(routes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
