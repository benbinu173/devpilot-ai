const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// -----------------------------------------------------
// System Prompts
// -----------------------------------------------------

const SYSTEM_PROMPTS = {

    general:
        "You are DevPilot AI, an expert software engineer. Give accurate answers using Markdown.",

    explain:
        "You are a senior software engineer. Explain code clearly, line by line, using Markdown and examples where useful.",

    debug:
        "You are an expert debugger. Identify bugs, explain why they occur, and provide corrected code.",

    refactor:
        "Refactor the provided code using modern best practices while preserving functionality.",

    tests:
        "Generate comprehensive unit tests for the provided code and explain the test strategy.",

    docs:
        "Generate clear and professional technical documentation for the provided code."

};

// -----------------------------------------------------
// Prompt Builders
// -----------------------------------------------------

function buildChatPrompt(
    mode = "general",
    context = null
) {

    let systemPrompt =
        SYSTEM_PROMPTS[mode] ??
        SYSTEM_PROMPTS.general;

    if (context?.activeFile) {

        systemPrompt += `

Current File:
${context.activeFile.name}

Language:
${context.activeFile.language}

File Content:

${context.activeFile.content}

`;

    }

    if (context?.selection?.text) {

        systemPrompt += `

Selected Code:

${context.selection.text}

Selection Start Line:
${context.selection.startLine}

Selection End Line:
${context.selection.endLine}

Focus your answer primarily on the selected code while using the rest of the file as context.

`;

    }

    return systemPrompt;

}

function buildSuggestionPrompt(file) {

    return `

You are DevPilot AI.

Analyze the following source code.

Generate EXACTLY 4 useful developer questions.

Return ONLY valid JSON.

DO NOT return markdown.

DO NOT wrap the response inside \`\`\`.

Return ONLY this schema:

[
    {
        "title":"...",
        "prompt":"..."
    }
]

Filename:
${file.name}

Language:
${file.language}

Source Code:

${file.content}

`;

}

// -----------------------------------------------------
// Helpers
// -----------------------------------------------------

function parseJsonResponse(response) {

    try {

        const cleaned = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);

    }

    catch (error) {

        console.error(
            "Unable to parse AI JSON response:",
            error
        );

        return [];

    }

}

// -----------------------------------------------------
// Chat
// -----------------------------------------------------

async function generateResponse(

    messages,

    mode = "general",

    context = null

) {

    const systemPrompt = buildChatPrompt(

        mode,

        context

    );

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

            {

                role: "system",

                content: systemPrompt

            },

            ...messages

        ],

        temperature: 0.5,

        max_completion_tokens: 1024

    });

    return completion.choices[0].message.content;

}

// -----------------------------------------------------
// Streaming
// -----------------------------------------------------

async function generateStream(

    messages,

    mode = "general",

    context = null

) {

    const systemPrompt = buildChatPrompt(

        mode,

        context

    );

    return await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        stream: true,

        messages: [

            {

                role: "system",

                content: systemPrompt

            },

            ...messages

        ],

        temperature: 0.5,

        max_completion_tokens: 1024

    });

}

// -----------------------------------------------------
// Suggestions
// -----------------------------------------------------

async function generateSuggestions(file) {

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.3,

        max_completion_tokens: 512,

        messages: [

            {

                role: "system",

                content: buildSuggestionPrompt(file)

            }

        ]

    });

    const response = completion.choices[0].message.content;

    const suggestions = parseJsonResponse(response);

    return {

        framework: file.framework ?? "Unknown",

        language: file.language ?? "Unknown",

        complexity: "Unknown",

        patterns: [],

        warnings: [],

        suggestions

    };

}

async function generateRawCompletion(prompt) {

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.2,

        max_completion_tokens: 2048,

        messages: [

            {

                role: "user",

                content: prompt

            }

        ]

    });

    return completion.choices[0].message.content;

}

// -----------------------------------------------------
// Exports
// -----------------------------------------------------

module.exports = {

    generateResponse,

    generateStream,

    generateSuggestions,
    
    generateRawCompletion

};