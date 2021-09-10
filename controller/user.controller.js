const router = require('express').Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'todo';
const conxURL = 'mongodb://localhost:27017';
const OID = mongodb.ObjectId;

router.route('/')
    .get(function(req,res,next){
        MongoClient.connect(conxURL, function(err,client){
            if(err){
                return next(err)
            }
            const db = client.db(dbName);
            db.collection('users')
                .find({})
                .toArray()
                    .then(function(response){
                        res.json(response)
                    })
                    .catch(function(err){
                        return next(err)
                    })
        })
    })

router.route('/search')
    .get(function(req,res,next){
        res.send('From search of user')
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })

router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id;
        MongoClient.connect(conxURL, function(err,client){
            if(err){
                return next(err)
            }
            const db = client.db(dbName);
            db.collection('users')
                .find({_id: new OID(id) })
                .toArray(function(err,user){
                    if(err){
                        return next(err)
                    }
                    res.json(user)
                })
        })
    })
    
    .put(function(req,res,next){
        const id = req.params.id;
        MongoClient.connect(conxURL, function(err,client){
            if(err){
                return next(err)
            }
            const db = client.db(dbName);
            db.collection('users')
                .updateOne(
                    {_id: new OID(id)},
                    {$set: req.body}
                )
                    .then(function(response){
                        res.json(response)
                    })
                    .catch(function(err){
                        return next(err)
                    })
        })
    })
    .delete(function(req,res,next){
        const id = req.params.id;
        MongoClient.connect(conxURL, function(err,client){
            if(err){
                return next(err)
            }
            const db = client.db(dbName);
            db.collection('users')
                .deleteOne({
                    _id: new OID(id)
                })
                    .then(function(response){
                        res.json(response)
                    })
                    .catch(function(err){
                        return next(err)
                    })
        })
    });



module.exports = router;