const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { response } = require("express");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).send("User Id Does Not Exist");

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const chats = Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please enter all fields");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    res.status(400).send("A group should have more than a single user");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      isGroupChat: true,
      chatName: req.body.name,
      groupAdmin: req.user,
      users: users,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, name } = req.body;
  if (!groupId || !name) {
    return res.status(400).send("Please enter all field");
  }

  try {
    const renameChat = await Chat.findOneAndUpdate(
      { _id: groupId },
      { chatName: name },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(renameChat);
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    { _id: chatId },
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (added) {
    res.status(200).json(added);
  } else {
    res.status(404);
    throw new Error("Chat not found!");
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const remove = await Chat.findByIdAndUpdate(
    { _id: chatId },
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (remove) {
    res.status(200).json(remove);
  } else {
    res.status(404);
    throw new Error("Chat not found!");
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
