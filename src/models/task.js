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
    }
});

taskSchema.pre('save',async function(next){
    const task = this;
    // if(task.isModified('desc')||task.isModified('completed'))
    // {
    //
    // }
    console.log("Before saving");
    next()
});

const Task = mongoose.model('Task',taskSchema);


module.exports = Task;
