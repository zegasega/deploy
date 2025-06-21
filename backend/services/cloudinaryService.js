const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINRY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

class CloudinaryService {
  async uploadImage(filePath, folder = 'PostImages') {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      throw new Error('Cloudinary yükleme hatası: ' + error.message);
    }
  }
}

module.exports = new CloudinaryService();
