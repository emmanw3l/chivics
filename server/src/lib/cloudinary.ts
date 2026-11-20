import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generates a signature so the admin client can upload directly to
 * Cloudinary without the API secret ever touching the browser.
 */
export function getUploadSignature(paramsToSign: Record<string, string | number>) {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { ...paramsToSign, timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return { timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY };
}

export function deleteCloudinaryImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;