const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
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
        token: {
            type: String,
            required: true
        }
    }]
});

// overriding method to show limited amount of data
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, "secretWord").toString();
    // user.tokens.push({ access, token })
    user.tokens = user.tokens.concat([{ access, token }]);
    return user.save().then(() => {
        return token
    }).catch((err) => {
        console.log(err.message)
    })
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'someSecret')
    } catch (e) {
        return Promise.reject()
    }

    //success case
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};


/* This is messing up my token creation */

UserSchema.pre('save', function (next) {
    let user = this;

    if(user.isModified('password')) {
        // user.password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
