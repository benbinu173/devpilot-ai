require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
const conversationRoutes = require("./routes/conversation.routes");
const workspaceFileRoutes = require("./routes/workspace-file.routes");
const workspaceContextRoutes = require(

    "./routes/workspace-context.routes"

);

const dependencyGraphRoutes = require(
    "./routes/dependency-graph.routes"
);

const codeSnippetRoutes = require(
    "./routes/code-snippet.routes"
);

const profileRoutes = require(
    "./routes/profile.routes"
);

const app = express();

// ----------------------------
// Middleware
// ----------------------------

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ----------------------------
// Health Check
// ----------------------------

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 DevPilot AI Backend Running"

    });

});

// ----------------------------
// Routes
// ----------------------------

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use(

    "/api/conversations",

    conversationRoutes

);

app.use("/api/workspace/files", workspaceFileRoutes);

app.use(

    "/api/workspace/context",

    workspaceContextRoutes

);

app.use(

    "/api/workspace/dependency-graph",

    dependencyGraphRoutes

);

app.use(
    "/api/snippets",
    codeSnippetRoutes
);

// ----------------------------
// 404
// ----------------------------

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found."

    });

});

connectDatabase();

// ----------------------------
// Start Server
// ----------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});