const uploadService = require("../services/workspace-file.service");

const workspaceFileService = require("../services/workspace-file.service");

const uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded."

            });

        }

        const file = await workspaceFileService.createFile(

            req.user.id,

            req.file

        );

        res.status(201).json({

            success: true,

            file

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to upload file."

        });

    }

};

const getFiles = async (req, res) => {

    try {

        const files = await workspaceFileService.getFiles(

            req.user.id

        );

        res.json({

            success: true,

            files

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load workspace."

        });

    }

};


    const updateFile = async (req, res) => {

    try {

        const { content } = req.body;

        if (typeof content !== "string") {

            return res.status(400).json({

                success: false,

                message: "File content is required."

            });

        }

        const file = await workspaceFileService.updateFile(

            req.user.id,

            req.params.id,

            {

                content,

                lastSavedContent: content,

                isDirty: false

            }

        );

        if (!file) {

            return res.status(404).json({

                success: false,

                message: "File not found."

            });

        }

        res.json({

            success: true,

            file

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to save file."

        });

    }

};

module.exports = {

    uploadFile,
    getFiles,
    updateFile

};