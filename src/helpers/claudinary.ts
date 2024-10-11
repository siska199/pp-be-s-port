import CONFIG from "@config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: CONFIG.CLAUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLAUDINARY_API_KEY,
  api_secret: CONFIG.CLAUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(new Error(`Error uploading to Cloudinary: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );

    stream.end(file.buffer);
  });
};

export default uploadFileToCloudinary;
