// Login, register, forget password, reset password
const express = require('express');
const router = express.Router();
const userModel = require('./../models/user.model');
const MAP_USER_REQUEST = require('./../helpers/map_user_request');
const multer = require('multer');
const path = require('path');
const passwordHash = require('password-hash');
const JWT = require('jsonwebtoken');
const config = require('./../configs/index');

// Creating token
function CreateToken(data){
    let token = JWT.sign({
        _id: data.id
    },config.JWT_SECRECT)
    return token;
}

// File filter
function myFilter(req,file,cb){
    var mimeType = file.mimetype.split('/')[0];
    if(mimeType == 'image'){
        cb(null, true)
    }else{
        req.fileTypeError = true;
        cb(null. false)
    }
}

// Complete control of file upload
const myStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(process.cwd(),'uploads/images'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: myStorage,
    fileFilter: myFilter
})

router.route('/login')
    .get()
    .post(function(req,res,next){
        userModel.findOne({
            username: req.body.username
        })
            .then(function(user){
                if(!user){
                    return next({
                        msg: 'Invalid Username',
                        status: 400
                    })
                }
                var isMatched = passwordHash.verify(req.body.password, user.password)
                var token = CreateToken(user);
                if(isMatched){
                    res.json({
                        user: user,
                        token: token
                    })
                }
            })
            .catch(function(err){
                next(err)
            })
    })

router.route('/register')
    .get()
    .post(upload.single('image'),function(req,res,next){
        // console.log('req body>>', req.body)
        // console.log('req file>>', req.file)

        if(req.file.fileTypeError){
            return next({
                msg: 'Invalid File Format',
                sttsu: 414
            })
        }
        if(req.file){
            req.body.image = req.file.filename;
        }

        var newUser = new userModel({});
        var mappedUser = MAP_USER_REQUEST(newUser, req.body);
        mappedUser.password = passwordHash.generate(req.body.password);

        mappedUser.save(function(err,done){

            if(err){
                return next(err);
            }
            res.json(done)
        })
    })

module.exports = router;