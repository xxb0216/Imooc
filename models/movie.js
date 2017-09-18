var mongoose = require('mongoose')
var MovieSchema=require('../schemas/movie')
var Movie = mongoose.module('Movie',MovieSchema)

module.exports = Movie