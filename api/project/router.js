const express = require('express')
const Projects = require('./model')
const router = express.Router()


router.get('/', (req, res, next) => {
    Projects.getAll()
      .then(projects => {
          res.json(projects)
      })
      .catch(next)
})




router.post('/', (req, res, next) => {
    Projects.create(req.body)
        .then(newProject => {
            if(newProject.project_completed === 0) {
                res.json({...newProject, project_completed: false});
            } else {
                res.json({...newProject, project_completed: true});
            }
            res.status(201).json(newProject);
        })
        .catch(next);
});


module.exports = router