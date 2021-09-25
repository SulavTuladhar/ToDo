const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Database modeling
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        minlength: 8
    },
    dob: {
        type: Date
    },
    phoneNumber: {
        type: Number
    },
    address: {
        tempAddress:[String],
        permanentAddress: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    image: String,
    role:{
        type: String,
        enum:['admin', 'user']
    },
},
    // timestamps
    {
        timestamps: true
    }
)
module.exports = mongoose.model('user', userSchema);