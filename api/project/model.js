const db = require('../../data/dbConfig');


const getAll = async () => {
    const projects = await  db('projects')

    return projects.map(project => {
        if(project.project_completed === 0){
            return {
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: false
            }
        } else {
            return {
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: true
            }
        }
    });
};


const create = newProject => {
    return  db('projects')
        .insert(newProject)
        .then(([project_id]) => {
            return  db('projects').where('project_id', project_id).first()

        })
};


module.exports = {
    getAll,
    create
}