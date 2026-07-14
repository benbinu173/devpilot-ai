const workspaceContextService = require("../services/workspace-context.service");

const getWorkspaceContext = async (req, res) => {

    try {

        const context = await workspaceContextService.buildWorkspaceContext(

            req.user.id

        );

        res.json({

            success: true,

            context

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load workspace context."

        });

    }

};

module.exports = {

    getWorkspaceContext

};