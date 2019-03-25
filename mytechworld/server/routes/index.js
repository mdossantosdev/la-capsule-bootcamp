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
  projectModel.find((error, projects) => {
    if (error) {
      console.log('Error', error);
    }
    res.json({ result: true, projects: projects });
  });
});

/* POST */
router.post('/myprojects', (req, res) => {
  const project = {
    id_project: req.body.id_project,
    name: req.body.name,
    description: req.body.description,
    picture: req.body.picture,
    stack_front: req.body.stack_front,
    stack_back: req.body.stack_back,
    days_spent: req.body.days_spent,
  };

  const newProject = new projectModel(project);

  newProject.save((error, project) => {
    if (error) {
      console.log('Error', error);
    }
    res.json({ result: true, project: project})
  })
});

/* DELETE */
router.delete('/myprojects/:projectId', (req, res) => {
  projectModel.deleteOne(
    { id_project: req.params.projectId },
    (error, response) => {
      if (error) {
        console.log('Error', error);
      }
      res.json({ result: true })
    }
  )
});

module.exports = router;
