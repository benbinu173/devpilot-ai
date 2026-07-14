const groqService = require("./groq.service");

async function generateResponse(
    messages,
    mode,
    context
) {

    return await groqService.generateResponse(

        messages,

        mode,

        context

    );

}

async function generateStream(
    messages,
    mode,
    context
) {

    return await groqService.generateStream(

        messages,

        mode,

        context

    );

}

module.exports = {

    generateResponse,

    generateStream

};