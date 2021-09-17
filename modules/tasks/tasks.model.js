const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo'
    },
    dueDate: Date,
    description: String,
    color: String
},{
    timestamps: true
})

const WorkspaceSchema = new Schema ({
    name: {
        type: String,
        unique: true,
    },
    color: String,
    tasks: [TaskSchema] //Array of objects
}, {
    timestamps: true
})

module.exports = mongoose.model('task', WorkspaceSchema)