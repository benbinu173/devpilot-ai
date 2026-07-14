const path = require("path");

const WorkspaceFile = require("../models/workspace-file.model");

const dependencyGraphService = require(
    "./dependency-graph.service"
);

const workspaceIndexService = require(
    "./workspace-index.service"
);

const LANGUAGE_MAP = {
    ".ts": "typescript",
    ".tsx": "typescript",
    ".js": "javascript",
    ".jsx": "javascript",
    ".java": "java",
    ".kt": "kotlin",
    ".py": "python",
    ".cpp": "cpp",
    ".cs": "csharp",
    ".html": "html",
    ".css": "css",
    ".scss": "scss",
    ".json": "json",
    ".md": "markdown",
    ".txt": "plaintext"
};

function getLanguage(extension) {

    return LANGUAGE_MAP[extension] ?? "plaintext";

}

function mapWorkspaceFile(file) {

    if (!file) {

        return null;

    }

    return {

        id: file._id.toString(),

        name: file.name,

        extension: file.extension,

        language: file.language,

        type: file.type,

        size: file.size,

        content: file.content,

        lastSavedContent: file.lastSavedContent,

        isDirty: file.isDirty,

        aiModified: file.aiModified,

        createdAt: file.createdAt,

        updatedAt: file.updatedAt,

        lastSavedAt: file.lastSavedAt

    };

}

// ============================================
// Create
// ============================================

async function createFile(userId, file) {

    const extension = path.extname(
        file.originalname
    ).toLowerCase();

    const workspaceFile = await WorkspaceFile.create({

        user: userId,

        name: file.originalname,

        extension,

        language: getLanguage(extension),

        type: file.mimetype,

        size: file.size,

        content: file.buffer.toString("utf8"),

        lastSavedContent: file.buffer.toString("utf8"),

        isDirty: false,

        aiModified: false

    });

    await workspaceIndexService.indexWorkspaceFile(

        workspaceFile,

        userId

    );

    return mapWorkspaceFile(

        workspaceFile

    );

}

// ============================================
// Get All
// ============================================

async function getFiles(userId) {

    const files = await WorkspaceFile.find({

        user: userId,

        isDeleted: false

    }).sort({

        updatedAt: -1

    });

    return files.map(

        mapWorkspaceFile

    );

}

// ============================================
// Get One
// ============================================

async function getFile(userId, fileId) {

    const file = await WorkspaceFile.findOne({

        _id: fileId,

        user: userId,

        isDeleted: false

    });

    return mapWorkspaceFile(file);

}

// ============================================
// Update
// ============================================

async function updateFile(userId, fileId, updates) {

    const updatedFile = await WorkspaceFile.findOneAndUpdate(

        {

            _id: fileId,

            user: userId,

            isDeleted: false

        },

        {

            ...updates,

            lastSavedAt: new Date()

        },

        {

            returnDocument: "after",

            runValidators: true

        }

    );

    if (updatedFile) {

        await workspaceIndexService.indexWorkspaceFile(

            updatedFile,

            userId

        );

    }

    return mapWorkspaceFile(

        updatedFile

    );

}

// ============================================
// Delete
// ============================================

async function deleteFile(userId, fileId) {

    const deletedFile = await WorkspaceFile.findOneAndUpdate(

        {

            _id: fileId,

            user: userId,

            isDeleted: false

        },

        {

            isDeleted: true

        },

        {

            returnDocument: "after"

        }

    );

    if (deletedFile) {

        await dependencyGraphService.buildGraph(

            userId

        );

    }

    return mapWorkspaceFile(

        deletedFile

    );

}

module.exports = {

    createFile,

    getFiles,

    getFile,

    updateFile,

    deleteFile

};