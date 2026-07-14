const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

async function register(data) {

    const existingUser = await User.findOne({

        email: data.email

    });

    if (existingUser) {

        throw new Error("Email already exists.");

    }

    const hashedPassword = await bcrypt.hash(

        data.password,

        10

    );

    const user = await User.create({

        name: data.name,

        email: data.email,

        password: hashedPassword

    });

    const token = jwt.sign(

        {

            id: user._id

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "7d"

        }

    );

    return {

        token,

        user: {

            id: user._id,

            name: user.name,

            email: user.email

        }

    };

}

async function login(data) {

    const user = await User.findOne({

        email: data.email

    });

    if (!user) {

        throw new Error("Invalid email or password.");

    }

    const isPasswordValid = await bcrypt.compare(

        data.password,

        user.password

    );

    if (!isPasswordValid) {

        throw new Error("Invalid email or password.");

    }

    const token = jwt.sign(

        {

            id: user._id

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "7d"

        }

    );

    return {

        token,

        user: {

            id: user._id,

            name: user.name,

            email: user.email

        }

    };

}

async function getCurrentUser(userId) {

    const user = await User.findById(userId)

        .select("-password");

    return user;

}

module.exports = {

    register,
    login,
    getCurrentUser

};