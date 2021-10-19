const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    // Database modeling
    name: String,
    dueDate: Date,
    description: String,
    status:{
        type: String,
        enum: ['todo', 'doing', 'done']
    },
    color: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }
    }, {
    timestamps: true
})

module.exports = mongoose.model('todo', TodoSchema);;