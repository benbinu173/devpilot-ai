const WorkspaceIndex = require("../models/workspace-index.model");
const dependencyGraphService = require(

    "./dependency-graph.service"

);
const parser = require("../utils/code-parser.util");

async function indexWorkspaceFile(file, userId) {

  const analysis = {

    rawImports:
        parser.parseRawImports(file.content),

    parsedImports:
        parser.parseImports(file.content),

    rawExports:
        parser.parseRawExports(file.content),

    parsedExports:
        parser.parseExports(file.content),

    classes:
        parser.parseClasses(file.content),

    interfaces:
        parser.parseInterfaces(file.content),

    functions:
        parser.parseFunctions(file.content)

};

    const workspaceIndex = await WorkspaceIndex.findOneAndUpdate(

        {

            user: userId,

            file: file._id

        },

        {

            user: userId,

            file: file._id,

            fileName: file.name,

            language: file.language,

            ...analysis,

            dependencies: [],

            indexedAt: new Date()

        },

        {

            returnDocument: "after",

            upsert: true,

            runValidators: true

        }

    );

    await dependencyGraphService.buildGraph(

    userId

);

    return workspaceIndex;

}

module.exports = {

    indexWorkspaceFile

};