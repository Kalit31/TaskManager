const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email invalid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length <= 6)
                throw new Error('Password too short');
            else if (value.includes('password'))
                throw new Error('Must not contain the word password');
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
                throw new Error('Age is negative')
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

// methods --> instances
userSchema.methods.generateAuthToken = async function(){
  const user = this
  const token =  jwt.sign({_id:user._id.toString()},'thisismynewcourse');
  user.tokens = user.tokens.concat({token})
    await  user.save()
    return token
};


//statics --> models
userSchema.statics.findByCredentials = async (email,password)=>{
     const user = await User.findOne({email});

    if(!user){
        throw new Error('Unable to login in')
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
        throw new Error('Unable to login in');

    return user
};


//Hash the plain text password before creating or updating user
userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
});

const User = mongoose.model('User',userSchema);

module.exports = User;