const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});




let User = mongoose.model('User', userSchema);

module.exports = User
