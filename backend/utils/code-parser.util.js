function parseRawImports(content) {

    return content.match(

        /^import .*$/gm

    ) ?? [];

}

function parseImports(content) {

    const imports = [];

    const regex =
        /import\s+(.*?)\s+from\s+['"](.+?)['"]/g;

    let match;

    while ((match = regex.exec(content)) !== null) {

        const importClause = match[1].trim();

        const module = match[2];

        const parsed = {

            module,

            symbols: [],

            defaultImport: null,

            namespaceImport: null,

            isRelative:

                module.startsWith("./") ||

                module.startsWith("../")

        };

        // import * as utils from '...'
        if (importClause.startsWith("* as ")) {

            parsed.namespaceImport =

                importClause.replace("* as ", "").trim();

        }

        // import DefaultExport from '...'
        else if (

            !importClause.startsWith("{") &&

            !importClause.includes(",")

        ) {

            parsed.defaultImport = importClause;

        }

        // import Default, { A, B } from '...'
        else if (importClause.includes(",")) {

            const parts = importClause.split(",");

            parsed.defaultImport = parts[0].trim();

            const named = parts[1]

                .replace("{", "")

                .replace("}", "");

            parsed.symbols = named

                .split(",")

                .map(symbol => symbol.trim())

                .filter(Boolean);

        }

        // import { A, B } from '...'
        else if (

            importClause.startsWith("{")

        ) {

            parsed.symbols = importClause

                .replace("{", "")

                .replace("}", "")

                .split(",")

                .map(symbol => symbol.trim())

                .filter(Boolean);

        }

        imports.push(parsed);

    }

    return imports;

}

function parseRawExports(content) {

    return content.match(

        /^export .*$/gm

    ) ?? [];

}

function parseExports(content) {

    const exports = [];

    const patterns = [

        {
            type: "class",
            regex: /export\s+(default\s+)?class\s+([A-Za-z0-9_]+)/g
        },

        {
            type: "interface",
            regex: /export\s+(default\s+)?interface\s+([A-Za-z0-9_]+)/g
        },

        {
            type: "function",
            regex: /export\s+(default\s+)?function\s+([A-Za-z0-9_]+)/g
        },

        {
            type: "const",
            regex: /export\s+(default\s+)?const\s+([A-Za-z0-9_]+)/g
        },

        {
            type: "enum",
            regex: /export\s+(default\s+)?enum\s+([A-Za-z0-9_]+)/g
        },

        {
            type: "type",
            regex: /export\s+(default\s+)?type\s+([A-Za-z0-9_]+)/g
        }

    ];

    for (const pattern of patterns) {

        let match;

        while ((match = pattern.regex.exec(content)) !== null) {

            exports.push({

                type: pattern.type,

                name: match[2],

                isDefault: Boolean(match[1])

            });

        }

    }

    return exports;

}

function parseClasses(content) {

    const regex = /class\s+([A-Za-z0-9_]+)/g;

    return [...content.matchAll(regex)]

        .map(match => match[1]);

}

function parseInterfaces(content) {

    const regex = /interface\s+([A-Za-z0-9_]+)/g;

    return [...content.matchAll(regex)]

        .map(match => match[1]);

}

function parseFunctions(content) {

    const regex = /function\s+([A-Za-z0-9_]+)/g;

    return [...content.matchAll(regex)]

        .map(match => match[1]);

}

module.exports = {

    parseRawImports,

    parseImports,

    parseRawExports,

    parseExports,

    parseClasses,

    parseInterfaces,

    parseFunctions

};