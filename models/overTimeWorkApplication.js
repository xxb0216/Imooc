var mongoose = require('mongoose')
var overTimeWorkApplicationSchema=require('../schemas/overTimeWorkApplication')
var overTimeWorkApplication = mongoose.model('overTimeWorkApplication',overTimeWorkApplicationSchema)

module.exports = overTimeWorkApplication