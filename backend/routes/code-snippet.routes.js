const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const snippetController = require(
    "../controllers/code-snippet.controller"
);

// ============================================
// CRUD
// ============================================

router.post(
    "/",
    authMiddleware,
    snippetController.createSnippet
);

router.get(
    "/",
    authMiddleware,
    snippetController.getSnippets
);

// ============================================
// Search
// ============================================

router.get(
    "/search",
    authMiddleware,
    snippetController.searchSnippets
);

// ============================================
// Recent
// ============================================

router.get(
    "/recent",
    authMiddleware,
    snippetController.getRecentSnippets
);

// ============================================
// Favorites List
// ============================================

router.get(
    "/favorites",
    authMiddleware,
    snippetController.getFavoriteSnippets
);

// ============================================
// CRUD by ID
// ============================================

router.get(
    "/:id",
    authMiddleware,
    snippetController.getSnippet
);

router.put(
    "/:id",
    authMiddleware,
    snippetController.updateSnippet
);

router.delete(
    "/:id",
    authMiddleware,
    snippetController.deleteSnippet
);

// ============================================
// Favorite Toggle
// ============================================

router.patch(
    "/:id/favorite",
    authMiddleware,
    snippetController.toggleFavorite
);

// ============================================
// Usage
// ============================================

router.patch(
    "/:id/use",
    authMiddleware,
    snippetController.incrementUsage
);

module.exports = router;