const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

const aiController = require("../controllers/ai.controller");

router.post(

    "/chat",

    authMiddleware,

    aiController.chat

);

router.post(

    "/suggestions",

    authMiddleware,

    aiController.generateSuggestions

);

module.exports = router;