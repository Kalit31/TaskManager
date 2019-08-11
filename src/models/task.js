const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref:'User'
    }
});


const Task = mongoose.model('Task',taskSchema);


module.exports = Task;
