function buildWorkspaceSummary(workspace) {

    if (!workspace) {

        return "No workspace information available.";

    }

    return `

Workspace Summary

Files:
${workspace.files.join(", ")}

Classes:
${workspace.classes.join(", ")}

Interfaces:
${workspace.interfaces.join(", ")}

Functions:
${workspace.functions.join(", ")}

`;

}

function buildSelection(selection) {

    if (!selection?.text) {

        return "No code selected.";

    }

    return `

Selected Code

${selection.text}

`;

}

function buildActiveFile(activeFile) {

    if (!activeFile) {

        return "No active file.";

    }

    return `

Current File

Name:
${activeFile.name}

Language:
${activeFile.language}

`;

}

module.exports = {

    buildWorkspaceSummary,

    buildSelection,

    buildActiveFile

};