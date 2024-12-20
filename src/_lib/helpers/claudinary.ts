import CONFIG from "@_lib/config";
import { CustomError } from "@_lib/middleware/error-handler";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: CONFIG.CLAUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLAUDINARY_API_KEY,
  api_secret: CONFIG.CLAUDINARY_API_SECRET,
});

const baseFolder = CONFIG.DB_NAME;

const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  folder?: string
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: `${baseFolder}/${folder}` },
        (error, result) => {
          if (error) {
            reject(new Error(error?.message));
          } else {
            resolve(result);
          }
        }
      )
      .end(file.buffer);
  });
};

export const getImageUrlFromClaudinary = async (params: {
  publicId: string;
  options?: object;
}) => {
  if (!params?.publicId) return;

  const { publicId, options } = params;
  const result = cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
  return result;
};

export const deleteImageFromCloudinary = async (
  publicId: string
): Promise<void> => {
  try {
    if (!publicId) return;

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new CustomError(
        `Failed to delete image from Cloudinary: ${result.result}`
      );
    }
  } catch (error) {
    throw new CustomError(
      `Error deleting image from Cloudinary: ${error.message}`
    );
  }
};

export default uploadFileToCloudinary;
