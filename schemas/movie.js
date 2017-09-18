var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	director:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	year:Number,
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

MovieSchema.pre('save',function(next){
	if (this.isNew){
		this.meta.creatAt = this.meta.updateAt =Date.now()
	}
	else{
		this.meta.updateAt =Date.now()
	}

	next()
})

MovieSchema.statics = {
	fetch: function (cb) {
		// body...
		return this
			.find({})
			.sort('meta.updateAt')
			exec(cb)
	},
	findById: function (id,cb) {
		// body...
		return this
			.findOne({_id:id})
			exec(cb)
	}	
}

module.exports =MovieSchema