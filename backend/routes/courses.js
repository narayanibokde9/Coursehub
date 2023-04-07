const express= require('express');
const router=express.Router();
const catchAsync= require('../utilities/catchAsync'); 
const Course= require('../models/course'); 
const courses= require('../controllers/coursesController');

router.get('/', catchAsync(courses.allCourse));

router.get('/:id',  catchAsync(courses.showCourse));

module.exports=router;