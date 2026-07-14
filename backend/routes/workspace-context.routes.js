const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const workspaceContextController = require("../controllers/workspace-context.controller");

router.get(

    "/",

    authMiddleware,

    workspaceContextController.getWorkspaceContext

);

module.exports = router;