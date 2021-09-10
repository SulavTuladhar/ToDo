// Login, register, forget password, reset password
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dbName = 'todo';
const conxURL = 'mongodb://localhost:27017';

router.route('/login')
    .get()
    .post(function(req,res,next){
        mongoClient.connect(conxURL, function(err,client){
            if(err){
                return next(err)
            }
            const db = client.db(dbName);
            db.collection('users')
                .find(req.body)
                .toArray(function(err,users){
                    if(err){
                        return next(err)
                    }
                    res.json(users)
                })
        })
    })

router.route('/register')
    .get()
    .post(function(req,res,next){
        mongoClient.connect(conxURL,function(err,client){
            console.log('inside mongoclient')
            if(err){
                return next(err)
            }
            console.log('Inside mongoclient after the first error handler')
            // Create
            const db = client.db(dbName);
            db.collection('users')
                .insertOne(req.body)
                    .then(function(response){
                        res.json(response)
                    })
                    .catch(function(err){
                        return next(err)
                    })
        })
    })

module.exports = router;