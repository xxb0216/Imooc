var mongoose = require('mongoose')
var receivedDocumentSchema=require('../schemas/receivedDocument')
var receivedDocument = mongoose.model('receivedDocument',receivedDocumentSchema,"receivedDocuments")

module.exports = receivedDocument