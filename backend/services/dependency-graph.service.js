const WorkspaceIndex = require("../models/workspace-index.model");

const graphCache = new Map();


function findExport(indexes, symbol) {

    for (const index of indexes) {

        const exported =

            index.parsedExports?.find(

                entry =>

                    entry.name === symbol

            );

        if (exported) {

            return {

                id: index.file.toString(),

                fileName: index.fileName,

                export: exported

            };

        }

    }

    return null;

}

async function buildGraph(userId) {

    const indexes = await WorkspaceIndex.find({

        user: userId

    });

    const graph = {};

    for (const index of indexes) {

graph[index.fileName] = {

    imports: [],

    importedBy: [],

    rawExports: index.rawExports ?? [],

    parsedExports: index.parsedExports ?? [],

    classes: index.classes ?? [],

    interfaces: index.interfaces ?? [],

    functions: index.functions ?? []

};

       for (const imported of index.parsedImports ?? []) {

    const resolvedSymbols = [];

    for (const symbol of imported.symbols) {

        const target = findExport(

            indexes,

            symbol

        );

        if (target) {

            resolvedSymbols.push(

                target

            );

        }

    }

    graph[index.fileName].imports.push({

        module: imported.module,

        symbols: imported.symbols,

        defaultImport: imported.defaultImport,

        namespaceImport: imported.namespaceImport,

        isRelative: imported.isRelative,

        resolvedSymbols

    });

}

    }

    for (const [sourceFile, node] of Object.entries(graph)) {

    for (const imported of node.imports) {

        for (const resolved of imported.resolvedSymbols ?? []) {

            const target = graph[resolved.fileName];

            if (!target) {

                continue;

            }

          target.importedBy.push({

    id: resolved.id,

    file: sourceFile,

    symbol: resolved.export.name

});
        }

    }

}

    graphCache.set(

        userId.toString(),

        graph

    );

    return graph;

}

function getGraph(userId) {

    return graphCache.get(

        userId.toString()

    ) ?? null;

}

function invalidateGraph(userId) {

    graphCache.delete(

        userId.toString()

    );

}

module.exports = {

    buildGraph,

    getGraph,

    invalidateGraph

};