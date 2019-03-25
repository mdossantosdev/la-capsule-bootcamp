const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  id_project: Number,
  name: String,
  description: String,
  picture: String,
  stack_front: Array,
  stack_back: Array,
  days_spent: Number,
});

const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;
