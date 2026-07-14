const authService = require("../services/auth.service");

// ----------------------------
// Register
// ----------------------------

const register = async (req, res) => {

    try {

        const result = await authService.register(req.body);

        res.status(201).json({

            success: true,

            ...result

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

// ----------------------------
// Login
// ----------------------------

const login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        res.json({

            success: true,

            ...result

        });

    } catch (error) {

        res.status(401).json({

            success: false,

            message: error.message

        });

    }

};

const me = async (req, res) => {

    try {

        const user = await authService.getCurrentUser(

            req.user.id

        );

        res.json({

            success: true,

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    register,

    login,

    me

};