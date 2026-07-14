const aiHistoryService = require("../services/ai-history.service");

const createHistory = async (req, res) => {

    try {

        const history = await aiHistoryService.createHistory(

            req.user.id,

            req.body

        );

        res.status(201).json({

            success: true,

            history

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to save AI history."

        });

    }

};

const getHistory = async (req, res) => {

    try {

        const history = await aiHistoryService.getHistory(

            req.user.id

        );

        res.json({

            success: true,

            history

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load AI history."

        });

    }

};

module.exports = {

    createHistory,

    getHistory

};