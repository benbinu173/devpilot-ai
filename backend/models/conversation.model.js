const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    role: {

        type: String,

        enum: ["user", "assistant"],

        required: true

    },

    content: {

        type: String,

        required: true

    }

}, {

    timestamps: true,

    _id: false

});

const conversationSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    title: {

        type: String,

        required: true

    },

    messages: [messageSchema]

}, {

    timestamps: true

});

module.exports = mongoose.model("Conversation", conversationSchema);