const router = require('express').Router();

router.route('/')
    .get(function(req,res,next){
        res.send('From empty user request')
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    });

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

router.route('/:userId')
    .get(function(req,res,next){
        res.send('From dynamic user handler')
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    });



module.exports = router;