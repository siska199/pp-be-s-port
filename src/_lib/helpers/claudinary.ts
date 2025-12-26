import CONFIG from "@_lib/config";
import { CustomError } from "@_lib/middleware/error-handler";
import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: CONFIG.CLAUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLAUDINARY_API_KEY,
  api_secret: CONFIG.CLAUDINARY_API_SECRET,
});

const baseFolder = CONFIG.DB_NAME;

type SupportedFileCategory = 'image' | 'pdf' | 'other';

const getFileCategory = (mimeType: string): SupportedFileCategory => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  return 'other';
};

export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  folder?: string,
): Promise<UploadApiResponse> => {
  if (!file?.buffer || !file?.mimetype) {
    throw new Error('Invalid file provided');
  }

  const fileCategory = getFileCategory(file.mimetype);

  const uploadOptions: UploadApiOptions = {
    folder: `${baseFolder}/${folder ?? ''}`,
    resource_type: fileCategory === 'image' ? 'image' : 'raw',
    type: 'upload',
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(new Error(error.message));
          return;
        }

        if (!result) {
          reject(new Error('Cloudinary upload failed with no result'));
          return;
        }

        resolve(result);
      })
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
