// const groqService = require("../services/groq.service");

const aiChatService = require("../services/ai-chat.service");

const aiSuggestionService = require("../services/ai-suggestion.service");

const aiPatchService = require("../services/ai-patch.service");

const chat = async (req, res) => {

    try {

        const {

    messages,

    mode = "general"

} = req.body;

      if (!messages || !Array.isArray(messages)) {

    return res.status(400).json({

        success: false,

        message: "Messages array is required."

    });

}

        const response = await aiChatService.generateResponse(

    messages,

    mode

);

        res.json({

            success: true,

            response

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "AI generation failed."

        });

    }

};

const generateSuggestions = async (req, res) => {

    try {

        const { file } = req.body;

        if (!file) {

            return res.status(400).json({

                success: false,

                message: "File is required."

            });

        }

        const analysis = await aiSuggestionService.generateSuggestions(file);

        res.json({

            success: true,

            analysis

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to generate suggestions."

        });

    }

};

const generatePatch = async (req, res) => {

    try {

        const {

            action,

            context

        } = req.body;

        const patch = await aiPatchService.generatePatch(

            action,

            context

        );

        res.json({

            success: true,

            patch

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to generate patch."

        });

    }

};

module.exports = {
    chat,
    generateSuggestions,
    generatePatch
};