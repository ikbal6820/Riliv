const moongoose = require('mongoose')
const user_collection1 =require('./userdata')
const { default: mongoose } = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/myuserdata')
.then(()=>{
    console.log('Mongoose connection sucessful')
})
.catch((err)=>{
    console.log(err);
})