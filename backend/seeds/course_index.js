const mongoose = require('mongoose');
const Course = require('../models/course');
const courses = require('./course_seeds');


mongoose.connect('mongodb+srv://womenshack:womenshack@cluster0.tqatzct.mongodb.net/test', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const seedCoursesDb = async() => {
    //await Course.deleteMany({});
    for (let i=0; i<8; i++)
    {
        const C = new Course({
           
            title: `${courses[i].title}`,
            description: `${courses[i].description}`,
            courseType:`${courses[i].courseType}`,
            price:`${courses[i].price}`,
            instructor:`${courses[i].instructor}`,
            offered_by:`${courses[i].offered_by}`,
            images:`${courses[i].images}`
        })
        await C.save();
    }
}

seedCoursesDb().then( () => {
    mongoose.connection.close();
});