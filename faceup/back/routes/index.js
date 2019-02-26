const express = require('express');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary');
const ImageModel = require('../models/Image');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

/* POST */
router.post('/upload', (req, res) => {
  const randomName = Math.floor(Math.random() * 1000000);
  const photoPath = `public/images/IMG-${randomName}.jpg`;
  const filename = req.files.photo;

  filename.mv(photoPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    cloudinary.v2.uploader.upload(photoPath, (error, result) => {
      if (result) {
        const image = {
          url: result.secure_url,
          name: result.original_filename,
        };

        const newImage = new ImageModel(image);

        newImage.save((err, image) => {
          if (image) {
            fs.unlinkSync(photoPath);
            res.status(200);
          }
        });
      } else {
        console.log(error);
      }
    });
  });
});

module.exports = router;
