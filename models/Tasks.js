const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    content: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true
    }
});

module.exports = mongoose.model('tasks', TaskSchema);