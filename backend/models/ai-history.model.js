const mongoose = require("mongoose");

const aiHistorySchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true

        },

        fileId: {

            type: String,

            required: true

        },

        fileName: {

            type: String,

            required: true

        },

        patch: {

            type: Object,

            required: true

        },

        previousCode: {

            type: String,

            required: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "AiHistory",

    aiHistorySchema

);