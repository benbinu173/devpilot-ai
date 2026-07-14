const groqService = require("./groq.service");

const contextUtil = require("../utils/ai-context.util");

function buildPatchPrompt(action, context) {

    return `

You are DevPilot AI.

You are modifying source code.

Action:
${action}

${contextUtil.buildWorkspaceSummary(context.workspace)}

${contextUtil.buildActiveFile(context.activeFile)}

${contextUtil.buildSelection(context.selection)}

Instructions:

- Modify ONLY the selected code.
- Preserve the rest of the file.
- Return ONLY valid JSON.
- Do NOT return Markdown.
- Do NOT wrap JSON in code fences.

Return this exact JSON structure:

{
    "summary":"...",
    "updatedCode":"...",
    "explanation":"..."
}

`;

}

async function generatePatch(action, context) {

    const response = await groqService.generateRawCompletion(

        buildPatchPrompt(action, context)

    );

    function extractJson(text) {

    return text

        .replace(/```json/g, "")

        .replace(/```/g, "")

        .trim();

}

    const aiPatch = JSON.parse(

    extractJson(response)

);

    return {

        summary: aiPatch.summary,

        explanation: aiPatch.explanation,

        updatedCode: aiPatch.updatedCode,

        action,

        language:

            context?.activeFile?.language ??

            "plaintext",

        originalCode:

            context?.selection?.text ??

            "",

        startLine:

            context?.selection?.startLine ??

            0,

        startColumn:

            context?.selection?.startColumn ??

            1,

        endLine:

            context?.selection?.endLine ??

            0,

        endColumn:

            context?.selection?.endColumn ??

            1

    };

}

module.exports = {

    generatePatch

};