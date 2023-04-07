const mongoose= require('mongoose');
const Schema= mongoose.Schema; 

const CourseSchema=new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true,
    },
    courseType:{
        type:String,
        required: true,
    },
    instructor:{
       type:String,
       required:true,
    },
    offered_by:{
        type:String,
        required: true,
    },
    images: String


})
module.exports= mongoose.model('Course', CourseSchema);