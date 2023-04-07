const mongoose = require('mongoose');
const Course = require('../models/course');

module.exports.allCourse = async(req, res) => {
    Course.find({})
    .then((items) => res.json(items));
};

module.exports.showCourse = async(req, res) => {
    const {id} =req.params;
    console.log(id);
    Course.findById(id)
    .then((items) => res.json(items));
};