const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true

        },

        title: {

            type: String,

            required: true,

            trim: true,

            maxlength: 120

        },

        description: {

            type: String,

            default: "",

            trim: true,

            maxlength: 500

        },

        language: {

            type: String,

            required: true,

            lowercase: true,

            trim: true,

            index: true

        },

        category: {

            type: String,

            default: "General",

            trim: true,

            index: true

        },

        tags: [

            {

                type: String,

                lowercase: true,

                trim: true

            }

        ],

        code: {

            type: String,

            required: true

        },

        isFavorite: {

            type: Boolean,

            default: false,

            index: true

        },

        usageCount: {

            type: Number,

            default: 0

        },

        lastUsedAt: {

            type: Date,

            default: null

        },

        source: {

            type: String,

            enum: [

                "manual",

                "workspace",

                "ai"

            ],

            default: "manual"

        },

        visibility: {

    type: String,

    enum: [

        "private",

        "public"

    ],

    default: "private"

},

        isDeleted: {

            type: Boolean,

            default: false,

            index: true

        }

    },

    {

        timestamps: true

    }

);

codeSnippetSchema.index({

    user: 1,

    language: 1

});

codeSnippetSchema.index({

    user: 1,

    category: 1

});

codeSnippetSchema.index({

    user: 1,

    tags: 1

});

codeSnippetSchema.index(

    {

        title: "text",

        description: "text",

        code: "text"

    },

    {

        language_override: "none"

    }

);

module.exports = mongoose.model(

    "CodeSnippet",

    codeSnippetSchema

);