const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../../middleware/auth');
const router = express.Router();
const imageControllers = require("../../controllers/images-controller");
const config = require('config');


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("不支援的檔案類型(只支援jpg、jpeg、png)");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // This directory should exist in your server root.
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the date to prevent overwriting.
  }
});


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits:{
    fileSize: config.get("fileMaxSize")
  } 
});

// Image upload route
router.post('/upload', auth, upload.single('image'), imageControllers.uploadImage, imageControllers.uploadErrorHandler);


module.exports = router;
