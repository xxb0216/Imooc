var mongoose = require('mongoose')
var jgyjjlSchema=require('../schemas/jgyjjl')
var jgyjjl = mongoose.model('jgyjjl',jgyjjlSchema)

module.exports = jgyjjl