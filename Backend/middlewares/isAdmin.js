// const { query } = require("express")

module.exports = function(req,res,next){
    if(req.query.role === 'admin'){
        next();
    }else{
        next({
            msg: 'You don\'t have permission',
            status: 403
        })
    }
}