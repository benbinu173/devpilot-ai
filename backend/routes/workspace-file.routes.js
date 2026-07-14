const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const upload = require("../middleware/upload.middleware");

const workspaceFileController = require("../controllers/workspace-file.controller");

const aiController = require("../controllers/ai.controller")
router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    workspaceFileController.uploadFile
);

router.get(
    "/",
    authMiddleware,
    workspaceFileController.getFiles
);

router.put(

    "/:id",

    authMiddleware,

    workspaceFileController.updateFile

);

router.post(

    "/patch",

    authMiddleware,

    aiController.generatePatch

);

module.exports = router;