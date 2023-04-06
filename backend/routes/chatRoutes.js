const express = require("express");
const { protect } = require("../middelwares/authMiddleware");
const { accessChat, fetchChats } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChats)

module.exports = router
