const conversationService = require("../services/conversation.service");

const createConversation = async (req, res) => {

    try {

        const conversation = await conversationService.createConversation(

            req.user.id

        );

        res.status(201).json({

            success: true,

            conversation

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to create conversation."

        });

    }

};

const getConversations = async (req, res) => {

    try {

        const conversations = await conversationService.getConversations(

            req.user.id

        );

        res.json({

            success: true,

            conversations

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load conversations."

        });

    }

};

const getConversationById = async (req, res) => {

    try {

        const conversation = await conversationService.getConversationById(

            req.params.id,

            req.user.id

        );

        res.json({

            success: true,

            conversation

        });

    }

    catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};

const sendMessage = async (req, res) => {

    try {

  const {

    prompt,

    mode = "general",

    context

} = req.body;

const conversation = await conversationService.sendMessage(

    req.params.id,

    req.user.id,

    prompt,

    mode,

    context

);

        res.json({

            success: true,

            conversation

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const streamMessage = async (req, res) => {

    try {

        // SSE Headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Flush headers immediately
        res.flushHeaders?.();

        const {

    prompt,

    mode = "general",

    context

} = req.body;

await conversationService.streamMessage(

    req.params.id,

    req.user.id,

    prompt,

    mode,

    context,

    res

);

    }

  catch (error) {

    console.error(error);

    res.write(
        `data: ${JSON.stringify({

            error: true,

            message: error.message

        })}\n\n`
    );

    res.end();

}

};

const deleteConversation = async (req, res) => {

    try {

        await conversationService.deleteConversation(

            req.params.id,

            req.user.id

        );

        res.json({

            success: true,

            message: "Conversation deleted."

        });

    }

    catch (error) {

        console.error(error);

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};



module.exports = {

    createConversation,
    getConversations,
    getConversationById,
    sendMessage,
    streamMessage,
    deleteConversation

};