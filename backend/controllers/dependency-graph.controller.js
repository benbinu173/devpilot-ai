const dependencyGraphService = require(
    "../services/dependency-graph.service"
);

const getDependencyGraph = async (req, res) => {

    try {

        let graph = dependencyGraphService.getGraph(
            req.user.id
        );

        if (!graph) {

            graph = await dependencyGraphService.buildGraph(
                req.user.id
            );

        }

        res.json({

            success: true,

            graph

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load dependency graph."

        });

    }

};

module.exports = {

    getDependencyGraph

};