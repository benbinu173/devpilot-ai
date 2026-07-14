const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const conversationController = require("../controllers/conversation.controller");

router.post(

    "/",

    authMiddleware,

    conversationController.createConversation

);

router.get(

    "/",

    authMiddleware,

    conversationController.getConversations

);

router.get(

    "/:id",

    authMiddleware,

    conversationController.getConversationById

);

router.post(

    "/:id/messages",

    authMiddleware,

    conversationController.sendMessage

);

router.post(

    "/:id/messages/stream",

    authMiddleware,

    conversationController.streamMessage

);

router.delete(

    "/:id",

    authMiddleware,

    conversationController.deleteConversation

);

module.exports = router;