const profileService = require("../services/profile.service");

// =====================================================
// Get Profile
// =====================================================

const getProfile = async (req, res) => {

    try {

        const profile = await profileService.getProfile(

            req.user.id

        );

        res.json({

            success: true,

            profile

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =====================================================
// Update Profile
// =====================================================

const updateProfile = async (req, res) => {

    try {

        const profile = await profileService.updateProfile(

            req.user.id,

            req.body

        );

        res.json({

            success: true,

            message: "Profile updated successfully.",

            profile

        });

    }

    catch (error) {

        console.error(error);

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// Upload Avatar
// =====================================================

const uploadAvatar = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No image uploaded."

            });

        }

        const profile = await profileService.uploadAvatar(

            req.user.id,

            req.file.path

        );

        res.json({

            success: true,

            message: "Avatar updated successfully.",

            profile

        });

    }

  catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,

        message: error.message

    });

}

};


// =====================================================
// Change Password
// =====================================================

const changePassword = async (req, res) => {

    try {

        const {

            currentPassword,

            newPassword,

            confirmPassword

        } = req.body;

        const result = await profileService.changePassword(

            req.user.id,

            {

                currentPassword,

                newPassword,

                confirmPassword

            }

        );

        res.json({

            success: true,

            message: result.message

        });

    }

    catch (error) {

        console.error(error);

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getProfile,

    updateProfile,

    uploadAvatar,
    
    changePassword

};