const CodeSnippet = require("../models/code-snippets.model");

// ============================================
// Mapper
// ============================================

function mapSnippet(snippet) {

    if (!snippet) {

        return null;

    }

    return {

        id: snippet._id.toString(),

        title: snippet.title,

        description: snippet.description,

        language: snippet.language,

        category: snippet.category,

        tags: snippet.tags,

        code: snippet.code,

        isFavorite: snippet.isFavorite,

        usageCount: snippet.usageCount,

        lastUsedAt: snippet.lastUsedAt,

        source: snippet.source,

        // visibility: snippet.visibility,

        createdAt: snippet.createdAt,

        updatedAt: snippet.updatedAt

    };

}

// ============================================
// Create
// ============================================

async function createSnippet(userId, data) {

    const snippet = await CodeSnippet.create({

        user: userId,

        title: data.title,

        description: data.description ?? "",

        language: data.language,

        category: data.category ?? "General",

        tags: data.tags ?? [],

        code: data.code,

        source: data.source ?? "manual"

        // visibility: data.visibility ?? "private"

    });

    return mapSnippet(snippet);

}

// ============================================
// Get All
// ============================================

async function getSnippets(userId, filters = {}) {

    const query = {

        user: userId,

        isDeleted: false

    };

    if (filters.search) {

        query.$text = {

            $search: filters.search

        };

    }

    if (filters.language) {

        query.language = filters.language;

    }

    if (filters.category) {

        query.category = filters.category;

    }

    if (filters.favorite === 'true') {

        query.isFavorite = true;

    }

    const snippets = await CodeSnippet.find(query)

        .sort({

            updatedAt: -1

        });

    return snippets.map(mapSnippet);

}

// ============================================
// Get One
// ============================================

async function getSnippet(userId, snippetId) {

    const snippet = await CodeSnippet.findOne({

        _id: snippetId,

        user: userId,

        isDeleted: false

    });

    return mapSnippet(snippet);

}

// ============================================
// Update
// ============================================

async function updateSnippet(userId, snippetId, updates) {

    const snippet = await CodeSnippet.findOneAndUpdate(

        {

            _id: snippetId,

            user: userId,

            isDeleted: false

        },

        {

            ...updates

        },

        {

            returnDocument: "after",

            runValidators: true

        }

    );

    return mapSnippet(snippet);

}

// ============================================
// Soft Delete
// ============================================

async function deleteSnippet(userId, snippetId) {

    const snippet = await CodeSnippet.findOneAndUpdate(

        {

            _id: snippetId,

            user: userId,

            isDeleted: false

        },

        {

            isDeleted: true

        },

        {

            returnDocument: "after"

        }

    );

    return mapSnippet(snippet);

}

// ============================================
// Toggle Favorite
// ============================================

async function toggleFavorite(userId, snippetId) {

    const snippet = await CodeSnippet.findOne({

        _id: snippetId,

        user: userId,

        isDeleted: false

    });

    if (!snippet) {

        return null;

    }

    snippet.isFavorite = !snippet.isFavorite;

    await snippet.save();

    return mapSnippet(snippet);

}

// ============================================
// Increment Usage
// ============================================

async function incrementUsage(userId, snippetId) {

    const snippet = await CodeSnippet.findOneAndUpdate(

        {

            _id: snippetId,

            user: userId,

            isDeleted: false

        },

        {

            $inc: {

                usageCount: 1

            },

            $set: {

                lastUsedAt: new Date()

            }

        },

        {

            returnDocument: "after"

        }

    );

    return mapSnippet(snippet);

}

// ============================================
// Search
// ============================================

async function searchSnippets(userId, filters = {}) {

    const query = {

        user: userId,

        isDeleted: false

    };

    if (filters.language) {

        query.language = filters.language;

    }

    if (filters.category) {

        query.category = filters.category;

    }

    if (filters.favorite !== undefined) {

        query.isFavorite = filters.favorite;

    }

    const tags =

filters.tags

?.split(",")

.map(

tag => tag.trim()

)

.filter(Boolean);

if (tags?.length) {

    query.tags = {

        $in: tags

    };

}

    if (filters.search) {

        query.$text = {

            $search: filters.search

        };

    }
const page = Number(filters.page) || 1;

const limit = Number(filters.limit) || 20;

const skip = (page - 1) * limit;

let sort = {

    updatedAt: -1

};

switch (filters.sort) {

    case "created":

        sort = {

            createdAt: -1

        };

        break;

    case "recent":

        sort = {

            lastUsedAt: -1

        };

        break;

    case "most-used":

        sort = {

            usageCount: -1

        };

        break;

    case "title":

        sort = {

            title: 1

        };

        break;

}

    const snippets = await CodeSnippet.find(query)

.skip(skip)

.limit(limit).sort(sort)

    return snippets.map(mapSnippet);

}

// ============================================
// Recent Snippets
// ============================================

async function getRecentSnippets(userId, limit = 10) {

    const snippets = await CodeSnippet.find({

        user: userId,

        isDeleted: false,

        lastUsedAt: {

            $ne: null

        }

    })

        .sort({

            lastUsedAt: -1

        })

        .limit(limit);

    return snippets.map(mapSnippet);

}

// ============================================
// Favorite Snippets
// ============================================

async function getFavoriteSnippets(userId) {

    const snippets = await CodeSnippet.find({

        user: userId,

        isDeleted: false,

        isFavorite: true

    }).sort({

        updatedAt: -1

    });

    return snippets.map(mapSnippet);

}

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