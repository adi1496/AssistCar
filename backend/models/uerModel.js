const crypto = require('crypto');

const mongoose = require('mongoose');
const helpFunctions = require ('./../utils/helpFunctions');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name'],
        maxlength: [50, 'First name should be maximun 50 chars'],
        trim: true
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your last name'],
        maxlength: [50, 'Last name should be maximun 50 chars'],
        trim: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function(el){
                return helpFunctions.validateEmail(el);
            },
            message: "This not a valid e-mail"
        }
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'The password should be minimum 8 characters'],
        select: false
    },

    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },

    userRole: {
        type: String,
        enum: ['adim', 'user', 'leader', 'driver'],
        default: 'user'
    },

    drivers:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ] ,

    active: {
        type: Boolean,
        default: true
    },

    activateAccount: String,

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: {
        type: Date,
        select: false,
        default: undefined
    }
});

userSchema.pre('save', async function(next) {
    if(this.isModified || this.isNew) {
        if(this.password) {
            // console.log("Password is modified");
            let salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);

            this.confirmPassword = undefined;
        }
    }

    next();
});

userSchema.pre('save', function() {
    if(this.isModified('password')){
        this.passwordChangedAt = Date.now() - 1000;
    }
});

userSchema.pre(/^find/, function(next){
    this.select('-__v');
    next();
})

userSchema.methods.comparePaswwords = async (password, candidatePassword) => {

    return await bcrypt.compare(candidatePassword, password);
}

userSchema.methods.createPasswordResetToken = function () {
    const randomStr = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto.createHash('sha256').update(randomStr).digest('hex');
    this.passwordResetTokenExpires = Date.now() + (10 * 60 * 1000);

    return randomStr;
}

userSchema.methods.changedPasswordAfter = function(JWTtimestamp) {
    //we get the timestamp of passwordChangedAt and we divide it to 1000
    // because it is in miliseconds and the timestamp of the jwt is in seconds (1sec = 1000milisec)
    return this.passwordChangedAt.getTime() / 1000 > JWTtimestamp
}

const User = mongoose.model('User', userSchema);

module.exports = User;