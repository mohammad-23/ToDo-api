var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    name: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: false
    }
});

module.exports = {
    Todo
};




















