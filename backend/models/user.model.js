const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {

        // =====================================================
        // Authentication
        // =====================================================

        name: {

            type: String,

            required: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        password: {

            type: String,

            required: true

        },

        // =====================================================
        // Profile
        // =====================================================

        role: {

            type: String,

            default: "Frontend Developer",

            trim: true

        },

        company: {

            type: String,

            default: "",

            trim: true,

            maxlength: 100

        },

        location: {

            type: String,

            default: "",

            trim: true,

            maxlength: 100

        },

        website: {

            type: String,

            default: "",

            trim: true

        },

        github: {

            type: String,

            default: "",

            trim: true

        },

        linkedin: {

            type: String,

            default: "",

            trim: true

        },

        bio: {

            type: String,

            default: "",

            maxlength: 250,

            trim: true

        },

        avatar: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model("User", userSchema);