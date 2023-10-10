var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dpriszhjh",
  api_key: "471262425812167",
  api_secret: "uhn_Qtbq19dO5OK3x_c1zRT7eZc"
});

const ImageUpload = async (req, res, next) => {
  console.log(req.files)
  const images = [];

  if (req.files.img && req.files.img.length > 0) {
    // Check if req.files.img is an array of files
    req.files.img.forEach((file) => {
      images.push(file.tempFilePath);
    });

    // Upload each image to Cloudinary
    const uploadPromises = images.map((imagePath) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imagePath, function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    // Wait for all uploads to finish
    try {
      const uploadedImages = await Promise.all(uploadPromises);
      const imag = {}
      const imagesUrl = uploadedImages.map((data)=>{
       return data.url
      })
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        images: imagesUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error",
        error: error
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "No images to upload"
    });
  }
};

module.exports = ImageUpload;
