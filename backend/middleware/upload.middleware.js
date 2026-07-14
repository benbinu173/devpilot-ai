const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const allowedExtensions = [

    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".java",
    ".kt",
    ".py",
    ".cpp",
    ".cs",
    ".html",
    ".css",
    ".scss",
    ".json",
    ".md",
    ".txt",
    ".pdf"

];

const upload = multer({

    storage,

    limits: {

        fileSize: 10 * 1024 * 1024

    },

    fileFilter(req, file, cb) {

        const extension = path.extname(

            file.originalname

        ).toLowerCase();

        if (

            allowedExtensions.includes(

                extension

            )

        ) {

            cb(null, true);

        }

        else {

            cb(

                new Error(

                    "Unsupported file type."

                )

            );

        }

    }

});

module.exports = upload;