// import { cloudinary } from "../configs/cloudinary.config.js";
// import { environment } from "../configs/environment.config.js";
// import { HttpError } from "../utils/httpError.js";
// import { StatusCode } from "../utils/statusCode.js";

const { cloudinary } = require("../configs/cloudinary.config.js");
const {ForbiddenError, InternalServerError} = require("../errors");
const { environment } = require("../configs/environment.config.js");
const multer  = require('multer')


const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/"))
    return cb(
      new ForbiddenError(
        "Only jpg, jpeg and png files are allowed."
      ), false
    );

  if (file.size > 5 * 1024 * 1024)     // 5 MB (5 * 1024 * 1024)
    return cb(
      new ForbiddenError( "File size must be less than 5 MB."), false
    );

  return cb(null, true);
};


const uploadImage = async (req, res, next) => {
  if (!req?.file) return next();
  cloudinary.uploader
    .upload_stream(
      {
        folder: environment.CLOUDINARY_FOLDER,
        resource_type: "image",
        transformation: [
          { width: 960, height: 560, crop: "fill" },
          { effect: 'outline:10', color: 'black' },
        ],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return next(
            new InternalServerError(
              "Error while uploading image."
            )
          );
        }

        req.file = result;
        next();
      }
    )
    .end(req.file.buffer);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

module.exports = { fileFilter, uploadImage, upload };