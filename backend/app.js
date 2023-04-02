const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')

const chats = require("./data/data.js");

const app = express();
dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log(chats);
  res.send(chats);
});

app.get("/chat/:id", (req, res) => {
  const chat = chats.find((c) => c._id == req.params.id);
  res.send(chat);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
