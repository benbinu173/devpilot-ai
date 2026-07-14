const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const profileController = require("../controllers/profile.controller");

const avatarUpload = require("../middleware/avatar-upload.middleware");

// =====================================================
// Get Current User Profile
// =====================================================

router.get(

    "/",

    authMiddleware,

    profileController.getProfile

);

// =====================================================
// Update Current User Profile
// =====================================================

router.put(

    "/",

    authMiddleware,

    profileController.updateProfile

);

router.post(

    "/avatar",

    authMiddleware,

    avatarUpload.single("avatar"),

    profileController.uploadAvatar

);


router.post(

    "/change-password",

    authMiddleware,

    profileController.changePassword

);

module.exports = router;