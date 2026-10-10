const express = require("express");
const multerq = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();

//cloudinary configuration
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer setup using memory storage
const storage = multerq.memoryStorage();
const upload = multerq({ storage: storage });

const parseImageUpload = (req, res, next) => {
 upload.single("image")(req, res, (error) => {
  if (error) {
   console.error("Image upload parsing failed:", error.message);
   return res.status(400).json({
    message: 'Upload must include a file field named "image".',
   });
  }
  next();
 });
};

router.post("/", parseImageUpload, async (req, res) => {
 try {
  if (!req.file) {
   return res.status(400).json({ message: "No file uploaded" });
  }

  // Function to upload the file to Cloudinary
  const streamUpload = (fileBuffer) => {
   return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
     if (error) {
      reject(error);
     } else {
      resolve(result);
     }
    });

    //use streamifier to convert the buffer to a readable stream and pipe it to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(stream);
   });
  };
  
  // Call the streamUpload function and wait for the result
  const result = await streamUpload(req.file.buffer);

  // Respond with the URL of the uploaded image
  res.status(200).json({ message: "File uploaded successfully", url: result.secure_url });
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;