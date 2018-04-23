var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});


module.exports = {
    User
}
