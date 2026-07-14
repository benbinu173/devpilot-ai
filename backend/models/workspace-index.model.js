const mongoose = require("mongoose");

const workspaceIndexSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true

        },

        file: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "WorkspaceFile",

            required: true,

            index: true

        },

        fileName: {

            type: String,

            required: true

        },

        language: {

            type: String,

            required: true

        },

       rawImports: [

    {

        type: String

    }

],

parsedImports: [

    {

        module: {

            type: String,

            required: true

        },

        symbols: [

            {

                type: String

            }

        ],

        defaultImport: {

            type: String,

            default: null

        },

        namespaceImport: {

            type: String,

            default: null

        },

        isRelative: {

            type: Boolean,

            default: false

        }

    }

],

       rawExports: [
    {
        type: String
    }
],

parsedExports: [
    {
        type: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        isDefault: {
            type: Boolean,
            default: false
        },

        line: {
            type: Number,
            default: 0
        }
    }
],

        classes: [

            {

                type: String

            }

        ],

        interfaces: [

            {

                type: String

            }

        ],

        functions: [

            {

                type: String

            }

        ],

        dependencies: [

            {

                type: String

            }

        ],

        indexedAt: {

            type: Date,

            default: Date.now

        }

    },

    {

        timestamps: true

    }

);

workspaceIndexSchema.index({

    user: 1,

    file: 1

}, {

    unique: true

});

module.exports = mongoose.model(

    "WorkspaceIndex",

    workspaceIndexSchema

);