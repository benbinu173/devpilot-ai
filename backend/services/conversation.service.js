const Conversation = require("../models/conversation.model");
const groqService = require("./groq.service");

async function createConversation(userId) {

    const conversation = await Conversation.create({

        user: userId,

        title: "New Conversation",

        messages: []

    });

    return conversation;

}


async function getConversations(userId) {

    return await Conversation.find(

        {

            user: userId

        },

        {

            title: 1,

            updatedAt: 1

        }

    )

    .sort({

        updatedAt: -1

    });

}

async function getConversationById(id, userId) {

    const conversation = await Conversation.findOne({

        _id: id,

        user: userId

    });

    if (!conversation) {

        throw new Error("Conversation not found.");

    }

    return conversation;

}


async function sendMessage(conversationId, userId, prompt, mode="general",context) {

    const conversation = await Conversation.findOne({

        _id: conversationId,

        user: userId

    });

    if (!conversation) {

        throw new Error("Conversation not found.");

    }

    // Save user's message

    conversation.messages.push({

        role: "user",

        content: prompt

    });

    // Build Groq history

    const history = conversation.messages.map(message => ({

        role: message.role,

        content: message.content

    }));

    // Get AI response

    const aiResponse = await groqService.generateResponse(history, mode, context);

    // Save AI response

    conversation.messages.push({

        role: "assistant",

        content: aiResponse

    });

    // Rename conversation automatically

    if (

        conversation.title === "New Conversation" &&

        prompt.trim().length > 0

    ) {

        conversation.title =

            prompt.length > 35

                ? prompt.substring(0, 35) + "..."

                : prompt;

    }

    await conversation.save();

    return conversation;

}


async function streamMessage(

    conversationId,

    userId,

    prompt,

    mode = "general",

    context,

    res

) {

    const conversation = await Conversation.findOne({

        _id: conversationId,

        user: userId

    });

    if (!conversation) {

        throw new Error("Conversation not found.");

    }

    // Save user's message

    conversation.messages.push({

        role: "user",

        content :prompt

    });

    // Build conversation history

    const history = conversation.messages.map(message => ({

        role: message.role,

        content: message.content

    }));

    // Start Groq stream

    const stream = await groqService.generateStream(

        history,

        mode,

        context

    );

    let assistantResponse = "";

    for await (const chunk of stream) {

        const token =

            chunk.choices?.[0]?.delta?.content ?? "";

        if (!token) continue;

        assistantResponse += token;

        res.write(

            `data: ${JSON.stringify({

                token

            })}\n\n`

        );

    }

    // Save assistant response

    conversation.messages.push({

        role: "assistant",

        content: assistantResponse

    });

    await conversation.save();

    res.write(

        `data: ${JSON.stringify({

            done: true

        })}\n\n`

    );

    res.end();

}

async function deleteConversation(conversationId, userId) {

    const conversation = await Conversation.findOneAndDelete({

        _id: conversationId,

        user: userId

    });

    if (!conversation) {

        throw new Error("Conversation not found.");

    }

    return conversation;

}

module.exports = {

    createConversation,
    getConversations,
    getConversationById,
    sendMessage,
    streamMessage,
    deleteConversation

};