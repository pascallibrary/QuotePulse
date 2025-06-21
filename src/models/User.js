const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },

    subscribed: {
        type: Boolean,
        default: true, 
    },

    preferredCategories: {
        type: [String],
        default: ['Bible', 'Psychology', 'Personal Development'],
        enum: ['Bible', 'Psychology', 'Personal Development'],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

},
    {
        timestamps: true,
    });

// --- Middleware: Hash password before saving ---

userSchema.pre('save', async function (next) {
    // only hash if password field is new or modified 
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // generate salt
        this.password = await bcrypt.hash(this.password, salt);
        next();       
    } catch (error) {
        next(error); // pass error to next middleware 
    }
});

// --- Method: Compare incoming password with hashed password ---

userSchema.methods.comparePassword = async function (candidatePassword){
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch(error) {
        throw new Error(error);
    }
}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
};


const User = mongoose.model('User', userSchema);
module.exports = User;


