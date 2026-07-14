const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const controller = require("../controllers/ai-history.controller");

router.get(

    "/",

    authMiddleware,

    controller.getHistory

);

router.post(

    "/",

    authMiddleware,

    controller.createHistory

);

module.exports = router;