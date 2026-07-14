const WorkspaceIndex = require("../models/workspace-index.model");

async function buildWorkspaceContext(userId) {

    const indexes = await WorkspaceIndex.find({

        user: userId

    });

    const context = {

        files: [],

        classes: [],

        interfaces: [],

        functions: [],

        imports: []

    };

    for (const index of indexes) {

        context.files.push(

            index.fileName

        );

        context.classes.push(

            ...(index.classes ?? [])

        );

        context.interfaces.push(

            ...(index.interfaces ?? [])

        );

        context.functions.push(

            ...(index.functions ?? [])

        );

        context.imports.push(

            ...(index.rawImports ?? [])

        );

    }

    context.files = [...new Set(context.files)];

    context.classes = [...new Set(context.classes)];

    context.interfaces = [...new Set(context.interfaces)];

    context.functions = [...new Set(context.functions)];

    context.imports = [...new Set(context.imports)];

    return context;

}

module.exports = {

    buildWorkspaceContext

};