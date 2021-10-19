const router = require('express').Router();
const projectModel = require('./../models/project.model');
const todoModel = require('./../models/todo.model');

function map_project(project, projectData){
    if(projectData.name)
        project.name = projectData.name;
    if(projectData.description)
        project.description = projectData.description;
    if(projectData.dueDate)
        project.dueDate = projectData.dueDate;
    if(projectData.status)
        project.status = projectData.status;
    if(projectData.color)
        project.color = projectData.color;
    // return project;
}

function mapped_todo(todo, todoData){
    if(todoData.name)
        todo.name = todoData.name;
    if(todoData.dueDate)
        todo.dueDate = todoData.dueDate;
    if(todoData.description)
        todo.description = todoData.description;
    if(todoData.status)
        todo.status = todoData.status;
    if(todoData.color)
        todo.color = todoData.color;
    if(todoData.projectName)
        todo.project = todoData.projectName;
        return todo;
}

router.route('/')
    .get(function(req,res,next){
        projectModel.find({})
            .exec(function(err,project){
                if(err){
                    return next(err)
                }
                res.json(project)
            })
    })
    .post(function(req,res,next){
        var newProject = new projectModel({});
        map_project(newProject, req.body);
        newProject.save()
            .then(function(response){
                res.json(response)
            })
            .catch(function(err){
                return next(err)
            })
    })

    router.route('/add-todo/:projectId')
        .post(function(req,res,next){
            const data =req.body;
            data.projectName = req.params.projectId;

            projectModel.findById(req.params.projectId, function(err,project){
                if(err){
                    return next(err);
                }
                if(!project){
                    return next({
                        msg: 'Project not FOund',
                        stauts: 404
                    })
                }
                //Project found now let's create todo
                    var newTodo = new todoModel({});
                    mapped_todo(newTodo, data);
                    newTodo.save()
                        .then(function(saved){
                            project.save(function(err,done){
                                if(err){
                                    return next(err);
                                }
                            })
                            
                            project.todo.push(saved._id);
                            res.json(saved);
                        })
                        .catch(function(err){
                            return next(err);
                        })
                
                
            })
        })

    
    router.route('/:projectId/:todoId')
        .get(function(req,res,next){
            todoModel.find({})
                .exec(function(err,todo){
                    if(err){
                        return next(err)
                    }
                    res.json(todo)
                })
        })

        .delete(function(req,res,next){
            todoModel.findById(req.params.todoId,function(err,todo){
                if(err){
                    return next(err)
                }
                if(!todo){
                    return next({
                        msg: 'Todo not Found',
                        status: 404
                    })
                }
                //TODO exists
                todo.remove()
                    .then(function(removed){
                        res.json(removed)
                    })
                    .catch(function(err){
                        return next(err)
                    })
            })
        })

        .put(function(req,res,next){
            projectModel.findById(req.params.projectId, function(err,project){
                if(err){
                    return next(err)
                }
                if(!project){
                    return next({
                        msg: 'project not Found',
                        status: 404
                    })
                }
                // Project exists now let's update todo
                todoModel.findById(req.params.todoId, function(err,todo){
                    if(err){
                        return next(err)
                    }
                    if(!todo){
                        return next({
                            msg: 'Todo Not Found',
                            status: 404
                        })
                    }
                    //Todo exists
                    var updatedTodo = mapped_todo(todo,req.body);
                    updatedTodo.save()
                        .then(function(saved){
                             
                            project.save(function(err,done){
                                return next(err)
                            })
                            res.json(saved)
                        })
                        .catch(function(err){
                            return next(err)
                        })
                })
                
            })
        })
        /*
        .delete(function(req,res,next){
            projectModel.findById(req.params.projectId, function(err,project){
                if(err){
                    return next(err)
                }
                if(!project){
                    return next({
                        msg: 'project not Found',
                        status: 404
                    })
                }
                // project exists
                
                todoModel.findById(req.params.todoId, function(err,todo){
                            
                    // Todo exists
                   
                     todo.remove()
                         .then(function(removed){
                             project.save(function(err,done){
                                 if(err){
                                     return next(err);
                                 }
                             })
                             res.json(removed)
                         })
                         .catch(function(err){
                             return next(err)
                         })

                    
                }) 
        })
    })
        */
    
    router.route('/:id')
        .get(function(req,res,next){
            projectModel.findById(req.params.id,function(err,project){
                if(err){
                    return next(err);
                }
                if(!project){
                    return next({
                        msg: "project Not Found",
                        status: 404
                    })
                }
                res.json(project)
            })
        })
        .put(function(req,res,next){
            projectModel.findById(req.params.id,function(err,project){
                if(err){
                    return next(err)
                }
                if(!project){
                    return next({
                        msg: 'Project Not found',
                        status: 404
                    })
                }
                // Project exist now updating
                map_project(project, req.body);
                project.save(function(err,updated){
                    if(err){
                        return next(err)
                    }
                    res.json(updated)
                })
            })
        })
        .delete(function(req,res,next){
            // console.log("params ko id >>", req.params.id)
            projectModel.findById(req.params.id,function(err,project){
                if(err){
                    return next(err)
                }
                if(!project){
                    return next({
                        msg: 'Project Not Found',
                        status: 404
                    })
                }
                // Project found now finding todo related to this project
                todoModel.deleteMany({project: req.params.id}, function(err,todo){
                   console.log("project is >>>>>", todo)
                   if(err){
                       return next(err);
                   }
                //    deleting todo first
                
                    project.remove(function(err,done){
                        if(err){
                            return next(err)
                        }
                    })
                    res.json(todo)
                
                   
               })
            })
        })
    

module.exports = router;