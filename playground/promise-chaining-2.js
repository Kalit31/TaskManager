require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteAndUpdate = async (id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count
};

deleteAndUpdate('5d4f017d50282860c6c23e30').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
});