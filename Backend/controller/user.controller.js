const router = require('express').Router();
const userModel = require('./../models/user.model');
const MAP_USER_REQUEST = require('./../helpers/map_user_request');

router.route('/')
    .get(function(req,res,next){
        var condition = {};
        userModel.find(condition)
            .sort({
                _id: -1
            })
            .exec(function(err,user){
                if(err){
                    return next(err);
                }
                res.json(user);
            })
    })

router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id, {username:1}, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User Not Found',
                    status: 404
                })
            }
            res.json(user);
        })
    })
    
    .put(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User Not Found',
                    status: 404
                })
            }
            // User exists now update. User is mongoose object
            var mappedUpdatedUser = MAP_USER_REQUEST(user,req.body);
            mappedUpdatedUser.save(function(err,updated){
                if(err){
                    return next(err);
                }
                res.json(updated)
            })

        })
    })
    .delete(function(req,res,next){
        const id = req.params.id;
        userModel.findById(id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User Not Found',
                    status: 404
                })
            }
            user.remove(function(err,removed){
                if(err){
                    return next(err)
                }
                res.json(removed)
            })
        })
    });



module.exports = router;