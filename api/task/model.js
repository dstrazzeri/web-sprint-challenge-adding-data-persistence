const db = require('../../data/dbConfig')


const getAll = async () => {
   const tasks = await db('tasks AS t')
       .leftJoin('projects AS p', 'p.project_id', 't.project_id')
       .select('t.*', 'p.*')
   return tasks.map (task => {
       if(task.task_completed === 0) {
           return {
               task_id: task.task_id,
               task_description: task.task_description,
               task_notes: task.task_notes,
               task_completed: false,
               project_name: task.project_name,
               project_description: task.project_description
           }
       } else {
           return {
               task_id: task.task_id,
               task_description: task.task_description,
               task_notes: task.task_notes,
               task_completed: true,
               project_name: task.project_name,
               project_description: task.project_description
           }
       }
   });
};


const create = async newTask => {
    const taskId = await db('tasks').insert(newTask)
    const task =  await db('tasks').where('task_id', taskId).first()

    if(task.task_completed === 0){
        return {
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: false,
            project_id: task.project_id
        }
    } else {
        return {
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: true,
            project_id: task.project_id
        }
    }
};


module.exports = {
    getAll,
    create
};