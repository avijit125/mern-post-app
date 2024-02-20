const mongoose = require("mongoose")


const postSchema  = new mongoose.Schema({
    title: { type : String , required : true },
    content: {type :String,required :true},
    createdBy:{ type: Number}// cause api is giving id as number
    // createdBy: {type : mongoose.Types.ObjectId , ref : "User" } , // user
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema)
module.exports= Post;