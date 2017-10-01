var mongoose = require('mongoose')

var hxtzdsSchema = new mongoose.Schema({
	date:String,
	company:String,
	chexing:String,
	chezhong:String,
	chehao:String,
	xiucheng:String,
	buwei:String,
	defectContent:String,
	quantity:String,
	person:String,
	chuzhi:String,
	issueDate:String,
	closeDate:String,
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
},{collection:"hxtzds"})

hxtzdsSchema.pre('save',function(next){
	if (this.isNew){
		this.meta.creatAt = this.meta.updateAt =Date.now()
	}
	else{
		this.meta.updateAt =Date.now()
	}

	next()
})

hxtzdsSchema.statics = {
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

module.exports =hxtzdsSchema