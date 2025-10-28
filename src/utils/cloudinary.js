const cloudinary = require('cloudinary').v2;

// Environment variables are loaded centrally in app.js (require('dotenv').config()).
// Do not call config() here to avoid multiple injections from dotenv.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
