const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ['onTrack', 'atRisk', 'offTrack']
    },
    color: String,
    todo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo'
    }]

},{
    timestamps: true
})
module.exports = mongoose.model('project', projectSchema);