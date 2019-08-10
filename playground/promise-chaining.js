const User = require('../src/models/user');
require('../src/db/mongoose');

const updateAgeandCount = async (id,age)=>{
        const user = await User.findByIdAndUpdate(id,{age});
        const count = await User.countDocuments({age});
        return count
};

updateAgeandCount('5d4ecd25af06ce3bb08d4afb',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
});