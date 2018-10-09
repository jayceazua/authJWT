const mongoose = require('mongoose'),
    bcrypt = require("bcryptjs"),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }

});

UserSchema.pre('save', (next) => {
    // SET createdAt AND updatedAt
    let now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    };

    // ENCRYPT PASSWORD
    let user = this;
    if (!user.isModified('password')) {
        return next();
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });

});

UserSchema.methods.comparePassword = (password, done) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
