import { api } from "./api";
/**
 * Uploads a single file straight to Cloudinary using a short-lived signature
 * from our backend, so the API secret never reaches the browser.
 */
export async function uploadCarImage(file) {
    const { data: sig } = await api.get("/admin/cars/upload-signature");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", String(sig.timestamp));
    formData.append("signature", sig.signature);
    formData.append("folder", "car-sales");
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok)
        throw new Error("Image upload failed");
    const data = await res.json();
    // `public_id` is Cloudinary's identifier; stored as storagePath to match
    // the CarImage field name kept from the earlier Firebase Storage setup.
    return { url: data.secure_url, storagePath: data.public_id };
}
