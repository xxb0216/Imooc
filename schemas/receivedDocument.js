var mongoose = require('mongoose')

var receivedDocumentSchema = new mongoose.Schema({
	docName:String,
	docStyle:String,
	docYear:String,
	docNO:String,
	docNum:String,
	docDate:String,
	meta: {
		creatAt:{
			type:Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

receivedDocumentSchema.pre('save',function(next){
	if (this.isNew){
		this.meta.creatAt = this.meta.updateAt =Date.now()
	}
	else{
		this.meta.updateAt =Date.now()
	}

	next()
})

receivedDocumentSchema.statics = {
	fetch: function (cb) {
		// body...
		return this
			.find()
//			.sort('meta.updateAt')
			.exec(cb)
		console.log(cb)
	},
	findById: function (id,cb) {
		// body...
		return this
			.findOne({_id:id})
			.exec(cb)
	}	
}

module.exports =receivedDocumentSchema