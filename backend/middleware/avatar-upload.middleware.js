const multer = require("multer");

const {
    CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// =====================================================
// Cloudinary Storage
// =====================================================

const storage = new CloudinaryStorage({

    cloudinary,

    params: async () => ({

        folder: "devpilot-ai/avatars",

        allowed_formats: [

            "jpg",

            "jpeg",

            "png",

            "webp"

        ],

        transformation: [

            {

                width: 400,

                height: 400,

                crop: "fill",

                gravity: "face"

            },

            {

                quality: "auto"

            },

            {

                fetch_format: "auto"

            }

        ]

    })

});

// =====================================================
// Image Validation
// =====================================================

const fileFilter = (req, file, callback) => {

    const allowedMimeTypes = [

        "image/jpeg",

        "image/png",

        "image/webp"

    ];

    if (

        allowedMimeTypes.includes(

            file.mimetype

        )

    ) {

        callback(

            null,

            true

        );

    }

    else {

        callback(

            new Error(

                "Only JPG, PNG and WEBP images are allowed."

            )

        );

    }

};

// =====================================================
// Upload
// =====================================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;