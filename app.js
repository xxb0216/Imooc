var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ =require('underscore')

var Movie=require('./models/movie')
var receivedDocument=require('./models/receivedDocument')
var overTimeWorkApplication=require('./models/overTimeWorkApplication')
var jgyjjls=require('./models/jgyjjl')


var bodyParser=require("body-parser")
var port = process.env.PORT || 3000
var app = express()

var hxtzds=[{
				_id:1,
				date:'9.12',
				company:'四方股份',
				chexing:'CRH380AL',
				chezhong:'',
				chehao:'2638',
				xiucheng:'五级修',
				buwei:'整车落成',
				defectContent:'油漆不良',
				quantity:3,
				person:'肖晓斌',
				chuzhi:'回修通知单',
				SN:'0901',
				issueDate:"9.12",
				closedDate:'9.13',
				remarks:'C'
			}]

mongoose.Promise = global.Promise;  
var url = 'mongodb://localhost/qdjzxmb';
mongoose.connect(url);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + url);  
}); 

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

app.set('views', './views/pages')
app.set('view engine', 'pug')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.listen(port)

console.log('imooc started on port ' + port)

// //index page
// app.get('/',function(req,res){
// 	Movie.fetch(function(err, movies){
// 		if (err){
// 			console.log(err)
// 		}
// 		res.render('index',{
// 			title:'demo1 首页1',
// 			movies:movies
// 		})
// 	})
// })

// 监造项目部展示页 index page
app.get('/',function(req,res){
	console.log('test')
	overTimeWorkApplication.fetch(function(err, overTimeWorkApplication){
		receivedDocument.fetch(function(err, receivedDocument){
			if (err){
				console.log(err)
			}
			console.log(receivedDocument)
			res.render('qdjzxmb',{
				title:'青岛机车车辆监造项目部',
					overTimeWorkApplication:overTimeWorkApplication,
					receivedDocuments:receivedDocument
			})
		})
	})

})

//detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		res.render('detail',{
			title: 'imooc'+movie.title,
			movie: movie
		})
	})

	res.render('index',{
		title:'demo1 首页1',
		movies:movie
		})
})

//list page
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err, movies){
		if (err){
			console.log(err)
		}
		res.render('index',{
			title:'demo1 首页1',
			movies:movies
		})
	})
	res.render('list',{
		title:'demo1 列表页',
		movies: movies
	})
})


//admin update movie
app.get('/admin/update/:id', function (req, res) {
	var id = req.params.id

	if (id) {
		Movie.findById(id, function (err,movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
			// body...
		})
	}
	// body...
})
//admin post movie
app.post('/admin/movie/new',function(req, req){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if (id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if (err){
				console.log(err)
			}

			_movie= _.extend(movie, movieObj)
			_mvoie.save(function(err, movie){
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/'+ movie._id)
			})
		})
	}
	else {
		_movie = new Movie({
			director:movieObj.director,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err,movie){
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/'+ movie._id)
		})
	}
})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'demo1 后台录入页',
		movie:{
			director:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	})
})

//竣工移交记录表 jgyjjllist page
app.get('/jgyjjllist',function(req,res){
	jgyjjl.fetch(function(err, jgyjjls){
		if (err){
			console.log(err)
		}
		res.render('jgyjjllist',{
			title:'检修动车组验收动态',
				jgyjjls:jgyjjl
		})
	})

})


// 加班情况 jiban page
app.get('/jiaban',function(req,res){
	overTimeWorkApplication.fetch(function(err, overTimeWorkApplication){
		if (err){
			console.log(err)
		}
		console.log(overTimeWorkApplication)
		res.render('jiaban',{
			title:'加班申请情况',
				overTimeWorkApplication:overTimeWorkApplication
		})
	})

})

// 收文记录 shouwenjilu page
app.get('/shouwenjilu',function(req,res){
	receivedDocument.fetch(function(err, receivedDocument){
		if (err){
			console.log(err)
		}
		console.log(receivedDocument)
		res.render('shouwenjilu',{
			title:'部门收文记录台账',
				receivedDocuments:receivedDocument
		})
	})
})

//回修通知单统计表 hxtzdlist page
app.get('/hxtzdlist',function(req,res){
	res.render('hxtzdlist',{
		title:'回修通知单统计表',
			hxtzds:hxtzds
	})
})