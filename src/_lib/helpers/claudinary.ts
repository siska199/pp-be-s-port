import CONFIG from "@config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: CONFIG.CLAUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLAUDINARY_API_KEY,
  api_secret: CONFIG.CLAUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  folder?: string
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: folder },
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

export const getImageUrlFromClaudinary = async (params: {
  publicId: string;
  options?: object;
}) => {
  const { publicId, options } = params;
  return await cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
};

export const deleteImageFromCloudinary = async (
  publicId: string
): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new Error(
        `Failed to delete image from Cloudinary: ${result.result}`
      );
    }
  } catch (error) {
    throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
  }
};

export default uploadFileToCloudinary;
