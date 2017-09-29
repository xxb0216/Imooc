var mongoose = require('mongoose')

var jgyjjlSchema = new mongoose.Schema({
	branch:String,
	task:String,
	style:String,
	time:String,
	isInspected:String,
	remarks:String,
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

jgyjjlSchema.pre('save',function(next){
	if (this.isNew){
		this.meta.creatAt = this.meta.updateAt =Date.now()
	}
	else{
		this.meta.updateAt =Date.now()
	}

	next()
})

jgyjjlSchema.statics = {
	fetch: function (cb) {
		// body...
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function (id,cb) {
		// body...
		return this
			.findOne({_id:id})
			.exec(cb)
	}	
}

module.exports =jgyjjlSchema