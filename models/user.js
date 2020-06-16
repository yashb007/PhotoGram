const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    resetToken:String,
    expireToken:Date,
    followers:[{
        type: ObjectId,
        ref:"User"
     }],
    following:[{
        type: ObjectId,
        ref:"User"
     }],
     pic:{
         type:String,
         default:"https://res.cloudinary.com/yashbansal/image/upload/v1591595472/download_u2yprw.png"
     }
})

mongoose.model("User",userSchema)