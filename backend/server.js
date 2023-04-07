const express = require('express');
const app= express();

const catchAsync= require('./utilities/catchAsync');
const ExpressError= require('./utilities/ExpressError');
const mongoose= require('mongoose');

const courseRoutes=require('./routes/courses');
// const methodOverride= require('method-override');
// const flash= require('connect-flash');


mongoose.connect('mongodb+srv://womenshack:womenshack@cluster0.tqatzct.mongodb.net/test', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

app.use('/courses', courseRoutes);


app.all('*', (req, res, next) => {
   next(new ExpressError('Page not found', 404));
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
 })