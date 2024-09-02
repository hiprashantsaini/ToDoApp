const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    content:{type:String},
    done:{type:Boolean,default:false}
})

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{type:String,required:true},
    password:{type:String,required:true},
    todoes:[todoSchema]
})

const user=new mongoose.model('user',userSchema);

module.exports=user;