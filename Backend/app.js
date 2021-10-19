const express = require('express');
const app = express(); // Entire express framework is avaliable in app
const PORT = 9090;
require('./db_init'); // Mongoose setup

const API_ROUTER = require('./api.route');

// Third party middleware
const morgan = require('morgan');

// Parse data according to their content type
// parse for multipart/formdata

// Loading inbuilt middleware
app.use(express.static('uploads')) // Serve static file. without path(internal serve)
app.use(express.urlencoded({ // parser for x-www-form-urlencoded
    extended: true
}));
app.use(express.json()); //JSON parser
 
app.use('/files', express.static('uploads')); 


// Loading third party middleware
app.use(morgan('dev'))

app.use('/api', API_ROUTER);

// 404 error handler
app.use(function(req,res,next){
    next({
        msg: ' Ah! shit! Not Found',
        status: 404
    })
})

// Error handling middleware
app.use(function(err,req,res,next){
    res.json({
        msg: err.msg || err,
        status: err.status || 400
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
