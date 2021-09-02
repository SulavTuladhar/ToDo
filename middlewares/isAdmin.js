const { query } = require("express")

module.exports = function(req,res,next){
    if(req.query.role === 'admin'){
        next();
    }else{
        res.json({
            msg: 'You don\'t have permission',
            status: 403
        })
    }
}