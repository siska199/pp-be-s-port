import CONFIG from "../config";
import { CustomError } from "../middleware/error-handler";
import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: CONFIG.CLAUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLAUDINARY_API_KEY,
  api_secret: CONFIG.CLAUDINARY_API_SECRET,
});

const baseFolder = CONFIG.DB_NAME;

type SupportedFileCategory = 'image' | 'pdf' | 'other';


export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  folder?: string,
): Promise<UploadApiResponse> => {
  if (!file?.buffer || !file?.mimetype) {
    throw new Error('Invalid file provided');
  }

  const uploadOptions: UploadApiOptions = {
    folder: `${baseFolder}/${folder ?? ''}`,
    type: 'upload',
    access_mode: "public"
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



type CloudinaryResourceType = 'image' | 'raw' | 'video';

export const getCloudinaryUrl = (params: {
  publicId: string;
  options?: Record<string, any>;
}) => {
  if (!params?.publicId) return '';

  const {
    publicId,
    options = {},
  } = params;

  return cloudinary.url(publicId, {
    ...options,
  });
};

export const deleteFromCloudinary = async (params: {
  publicId: string;
  resourceType?: CloudinaryResourceType;
}): Promise<void> => {
  const { publicId, } = params;
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      throw new CustomError(
        `Failed to delete from Cloudinary: ${result.result}`
      );
    }
  } catch (error: any) {
    throw new CustomError(
      `Error deleting data from Cloudinary: ${error?.message ?? error}`
    );
  }
};

export default uploadFileToCloudinary;
