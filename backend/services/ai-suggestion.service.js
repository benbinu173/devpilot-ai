const groqService = require("./groq.service");

async function generateSuggestions(
    file,
    context
) {

    return await groqService.generateSuggestions(

        file,

        context

    );

}

module.exports = {

    generateSuggestions

};