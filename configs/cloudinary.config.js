// import { v2 as cloudinary } from "cloudinary";
const { environment } = require("./environment.config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: environment.CLOUDINARY_NAME,
  api_key: environment.CLOUDINARY_KEY,
  api_secret: environment.CLOUDINARY_SECRET,
});

module.exports = { cloudinary };