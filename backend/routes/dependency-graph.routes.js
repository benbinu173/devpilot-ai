const express = require("express");

const router = express.Router();

const authMiddleware = require(
    "../middleware/auth.middleware"
);

const dependencyGraphController = require(
    "../controllers/dependency-graph.controller"
);

router.get(

    "/",

    authMiddleware,

    dependencyGraphController.getDependencyGraph

);

module.exports = router;