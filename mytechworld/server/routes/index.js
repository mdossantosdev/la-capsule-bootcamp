const express = require('express');
const router = express.Router();
const projectModel = require('../models/project');

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
