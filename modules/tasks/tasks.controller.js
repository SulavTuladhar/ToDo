const tasksModel = require('./tasks.model');

function insert(req,res,next){
    const data = req.body;
    const newTask = new tasksModel({});
}

function find(req,res,next){
    var condition = {}
    tasksModel.find(condition)
        .exec(function(err,tasks){
            if(err){
                return next(err)
            }
            res.json(tasks)
        })
}

function findById(req,res,next){

}

function update(req,res,next){

}

function remove(req,res,next){

}

function addTasks(req,res,next){

}

function updateTasks(req,res,next){

}

function removeTasks(req,res,next){

}

module.exports = {
    insert,
    find,
    findById,
    update,
    remove,
    addTasks,
    updateTasks,
    removeTasks
}