const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    reservation: {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        },
        startDate: Date,
        endDate: Date
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(function () {
        console.log("confirmPassword1" + this._confirmPassword)
        return this._confirmPassword;
    })
    .set(function (value) {
        console.log("confirmPassword2" + value)
        this._confirmPassword = value;
    });

UserSchema.pre('validate', function (next) {
    console.log("validate" + this.password + this.confirmPassword)
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    console.log("save")
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


module.exports = mongoose.model('User', UserSchema)