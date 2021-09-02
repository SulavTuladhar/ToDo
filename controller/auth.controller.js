// Login, register, forget password, reset password
const express = require('express');
const router = express.Router();

router.get('/login', function(req,res,next){
    res.send('From Login')
})

router.post('/login', function(req,res,next){
    res.send('From post login')
})

router.get('/register', function(req,res,next){
    res.send('from get register')
})

router.post('/register', function(req,res,next){
    res.send('from post register')
})

module.exports = router;