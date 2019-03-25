const express = require('express');
const router = express.Router();
const projectModel = require('../models/project');
const DATA = require('../data/data.json');

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/projects', (req, res) => {
  const projects = DATA.projects;
  res.json({ result: true, projects: projects });
});

router.get('/myprojects', (req, res) => {
  projectModel.find((err, projects) => {
    if (err) {
      console.log('Error', err);
    }
    res.json({ result: true, projects: projects });
  });
});

module.exports = router;
