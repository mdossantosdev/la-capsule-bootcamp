const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const cloudinary = require('cloudinary');
const ImageModel = require('../models/Image');

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Azure Face AI setup
const subscriptionKey = process.env.AZURE_API_KEY;
const uriBase = process.env.AZURE_URL;

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/images', (req, res) => {
  ImageModel.find((err, data) => {
    res.json({ result: true, data });
  });
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
        const imageUrl = result.secure_url;

        const params = {
          returnFaceId: 'true',
          returnFaceLandmarks: 'false',
          returnFaceAttributes: `age,gender,headPose,smile,facialHair,glasses,emotion,
            hair,makeup,occlusion,accessories,blur,exposure,noise`,
        };

        const options = {
          uri: uriBase,
          qs: params,
          body: `{"url": "${imageUrl}"}`,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          },
        };

        request.post(options, (error, response, body) => {
          if (error) {
            console.log('Error: ', error);
            return;
          }

          let jsonResponse = JSON.parse(body);

          if (jsonResponse.length > 0) {
            const image = {
              url: result.secure_url,
              name: result.original_filename,
              age: jsonResponse[0].faceAttributes.age,
              gender: jsonResponse[0].faceAttributes.gender,
            };

            const newImage = new ImageModel(image);

            newImage.save((err, image) => {
              fs.unlinkSync(photoPath);
              res.json({ result: true, data: image });
            });
          } else {
            console.log('No Face Detected');
            fs.unlinkSync(photoPath);
            res.json({ result: false, data: 'No face detected' });
          }
        });
      } else {
        console.log(error);
      }
    });
  });
});

module.exports = router;
