const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chats = require("./data/data.js");

// Routes
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middelwares/errorMiddleware");

const app = express();
dotenv.config();

app.use(express.json());

connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log(chats);
  res.send(chats);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
