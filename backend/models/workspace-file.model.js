const mongoose = require("mongoose");

const workspaceFileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        extension: {
            type: String,
            required: true
        },

        language: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        size: {
            type: Number,
            required: true
        },

        content: {
            type: String,
            default: ""
        },

        lastSavedContent: {
            type: String,
            default: ""
        },

        isDirty: {
            type: Boolean,
            default: false
        },

        aiModified: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        lastSavedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "WorkspaceFile",
    workspaceFileSchema
);