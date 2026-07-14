const snippetService = require("../services/code-snippet.service");

// ============================================
// Create
// ============================================

const createSnippet = async (req, res) => {

    try {

        const snippet = await snippetService.createSnippet(

            req.user.id,

            req.body

        );

        res.status(201).json({

            success: true,

            snippet

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to create snippet."

        });

    }

};

// ============================================
// Get All
// ============================================

const getSnippets = async (req, res) => {

    try {

        const snippets = await snippetService.getSnippets(

            req.user.id,

            req.query

        );

        res.json({

            success: true,

            snippets

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load snippets."

        });

    }

};

// ============================================
// Get One
// ============================================

const getSnippet = async (req, res) => {

    try {

        const snippet = await snippetService.getSnippet(

            req.user.id,

            req.params.id

        );

        if (!snippet) {

            return res.status(404).json({

                success: false,

                message: "Snippet not found."

            });

        }

        res.json({

            success: true,

            snippet

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load snippet."

        });

    }

};

// ============================================
// Update
// ============================================

const updateSnippet = async (req, res) => {

    try {

       const updates = {};

if (req.body.title !== undefined) {

    updates.title = req.body.title;

}

if (req.body.description !== undefined) {

    updates.description = req.body.description;

}

if (req.body.language !== undefined) {

    updates.language = req.body.language;

}

if (req.body.category !== undefined) {

    updates.category = req.body.category;

}

if (req.body.tags !== undefined) {

    updates.tags = req.body.tags;

}

if (req.body.code !== undefined) {

    updates.code = req.body.code;

}

const snippet = await snippetService.updateSnippet(

    req.user.id,

    req.params.id,

    updates

);

        if (!snippet) {

            return res.status(404).json({

                success: false,

                message: "Snippet not found."

            });

        }

        res.json({

            success: true,

            snippet

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update snippet."

        });

    }

};

// ============================================
// Delete
// ============================================

const deleteSnippet = async (req, res) => {

    try {

        const snippet = await snippetService.deleteSnippet(

            req.user.id,

            req.params.id

        );

        if (!snippet) {

            return res.status(404).json({

                success: false,

                message: "Snippet not found."

            });

        }

        res.json({

            success: true,

            message: "Snippet deleted."

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to delete snippet."

        });

    }

};

// ============================================
// Favorite
// ============================================

const toggleFavorite = async (req, res) => {

    try {

        const snippet = await snippetService.toggleFavorite(

            req.user.id,

            req.params.id

        );

        if (!snippet) {

            return res.status(404).json({

                success: false,

                message: "Snippet not found."

            });

        }

        res.json({

            success: true,

            snippet

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update favorite."

        });

    }

};

// ============================================
// Usage
// ============================================

const incrementUsage = async (req, res) => {

    try {

        const snippet = await snippetService.incrementUsage(

            req.user.id,

            req.params.id

        );

        if (!snippet) {

            return res.status(404).json({

                success: false,

                message: "Snippet not found."

            });

        }

        res.json({

            success: true,

            snippet

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update usage."

        });

    }

};

// ============================================
// Search
// ============================================

const searchSnippets = async (req, res) => {

    try {

        const snippets = await snippetService.searchSnippets(

            req.user.id,

            req.query

        );

        res.json({

   success: true,

    snippets

});

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to search snippets."

        });

    }

};

// ============================================
// Recent
// ============================================

const getRecentSnippets = async (req, res) => {

    try {

        const limit = Number(req.query.limit) || 10;

        const snippets = await snippetService.getRecentSnippets(

            req.user.id,

            limit

        );

        res.json({

            success: true,

            snippets

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load recent snippets."

        });

    }

};

// ============================================
// Favorites
// ============================================

const getFavoriteSnippets = async (req, res) => {

    try {

        const snippets = await snippetService.getFavoriteSnippets(

            req.user.id

        );

        res.json({

            success: true,

            snippets

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to load favorite snippets."

        });

    }

};

module.exports = {

    createSnippet,

    getSnippets,

    getSnippet,

    updateSnippet,

    deleteSnippet,

    toggleFavorite,

    incrementUsage,

    searchSnippets,

    getRecentSnippets,

    getFavoriteSnippets

};