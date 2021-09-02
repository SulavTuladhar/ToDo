const express = require('express');
const app = express(); // Entire express framework is avaliable in app
const PORT = 9090;

// Importing routing level middleware
const AuthRouter = require('./controller/auth.controller');
const UserRouter = require('./controller/user.controller');

// Importing application level middlware
const isAdmin = require('./middlewares/isAdmin');

// Third party middleware
const morgan = require('morgan');

// Loading third party middleware
app.use(morgan('dev'))

//Loading routing level middlware
app.use('/auth', AuthRouter);
app.use('/user', isAdmin, UserRouter);

// 404 error handler
app.use(function(req,res,next){
    res.json({
        msg: 'Not Found',
        status: 404
    })
})

//Server listner
app.listen(PORT, '127.0.0.1', function(err,done){
    if(err){
        console.log("Server listening failed", err)
    }else{
        console.log('Server listening at port ' + PORT)
    }
})
