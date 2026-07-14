const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// =====================================================
// Get Profile
// =====================================================

async function getProfile(userId) {

    const user = await User.findById(userId)
        .select("-password");

    if (!user) {

        throw new Error("User not found.");

    }

    return user;

}

// =====================================================
// Update Profile
// =====================================================

async function updateProfile(userId, data) {

    const user = await User.findById(userId);

    if (!user) {

        throw new Error("User not found.");

    }

    // =====================================================
    // Name
    // =====================================================

    if (data.name !== undefined) {

        const name = data.name.trim();

        if (name.length < 3) {

            throw new Error(

                "Name must contain at least 3 characters."

            );

        }

        user.name = name;

    }

    // =====================================================
    // Role
    // =====================================================

    if (data.role !== undefined) {

        const role = data.role.trim();

        if (role.length > 50) {

            throw new Error(

                "Role cannot exceed 50 characters."

            );

        }

        user.role = role;

    }

    // =====================================================
    // Company
    // =====================================================

    if (data.company !== undefined) {

        const company = data.company.trim();

        if (company.length > 100) {

            throw new Error(

                "Company cannot exceed 100 characters."

            );

        }

        user.company = company;

    }

    // =====================================================
    // Location
    // =====================================================

    if (data.location !== undefined) {

        const location = data.location.trim();

        if (location.length > 100) {

            throw new Error(

                "Location cannot exceed 100 characters."

            );

        }

        user.location = location;

    }

    // =====================================================
    // Bio
    // =====================================================

    if (data.bio !== undefined) {

        const bio = data.bio.trim();

        if (bio.length > 250) {

            throw new Error(

                "Bio cannot exceed 250 characters."

            );

        }

        user.bio = bio;

    }

    // =====================================================
    // Website
    // =====================================================

    if (data.website !== undefined) {

        const website = data.website.trim();

        if (

            website &&

            !/^https?:\/\/.+/i.test(website)

        ) {

            throw new Error(

                "Website must be a valid URL."

            );

        }

        user.website = website;

    }

    // =====================================================
    // GitHub
    // =====================================================

    if (data.github !== undefined) {

        const github = data.github.trim();

        if (

            github &&

            !/^https?:\/\/(www\.)?github\.com\/.+/i.test(github)

        ) {

            throw new Error(

                "Enter a valid GitHub profile URL."

            );

        }

        user.github = github;

    }




    // =====================================================
    // LinkedIn
    // =====================================================

    if (data.linkedin !== undefined) {

        const linkedin = data.linkedin.trim();

        if (

            linkedin &&

            !/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(linkedin)

        ) {

            throw new Error(

                "Enter a valid LinkedIn profile URL."

            );

        }

        user.linkedin = linkedin;

    }

    // =====================================================
    // Avatar
    // =====================================================

    if (data.avatar !== undefined) {

        user.avatar = data.avatar;

    }

    await user.save();

    return await User.findById(userId)

        .select("-password");

}


const uploadAvatar = async (userId, avatarUrl) => {

    const user = await User.findByIdAndUpdate(

        userId,

        {

            avatar: avatarUrl

        },

        {

            new: true,

            runValidators: true

        }

    ).select("-password");

    if (!user) {

        throw new Error("User not found.");

    }

    return user;

};

// =====================================================
// Change Password
// =====================================================

const changePassword = async (

    userId,

    {

        currentPassword,

        newPassword,

        confirmPassword

    }

) => {

    // =====================================================
    // Validation
    // =====================================================

    if (

        !currentPassword ||

        !newPassword ||

        !confirmPassword

    ) {

        throw new Error(

            "All password fields are required."

        );

    }

    if (

        newPassword !== confirmPassword

    ) {

        throw new Error(

            "Passwords do not match."

        );

    }

    // =====================================================
    // Load User
    // =====================================================

    const user = await User.findById(

        userId

    );

    if (!user) {

        throw new Error(

            "User not found."

        );

    }

    // =====================================================
    // Verify Current Password
    // =====================================================

    const passwordMatches = await bcrypt.compare(

        currentPassword,

        user.password

    );

    if (!passwordMatches) {

        throw new Error(

            "Current password is incorrect."

        );

    }

    // =====================================================
    // Prevent Reusing Password
    // =====================================================

    const samePassword = await bcrypt.compare(

        newPassword,

        user.password

    );

    if (samePassword) {

        throw new Error(

            "New password must be different from your current password."

        );

    }

    // =====================================================
    // Password Policy
    // =====================================================

    const passwordRegex =

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (

        !passwordRegex.test(

            newPassword

        )

    ) {

        throw new Error(

            "Password does not meet security requirements."

        );

    }

    // =====================================================
    // Hash Password
    // =====================================================

    user.password = await bcrypt.hash(

        newPassword,

        12

    );

    await user.save();

    return {

        message:

            "Password changed successfully."

    };

};

module.exports = {

    getProfile,

    updateProfile,

    uploadAvatar,

    changePassword

};