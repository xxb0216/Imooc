var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ =require('underscore')
var Movie=require('./models/movie.js')
var bodyParser=require("body-parser")
var port = process.env.PORT || 3000
var app = express()

var receivedDocuments=[{
				_id:1,
				docName:'中国铁路总公司关于广铁集团海',
				docStyle:'铁总运函',
				docYear:'[2017]',
				docNO:'112号',
				docNum:'1',
				docDate:'9月12日'
			}]
var overTimeWorkApplication=[{
				_id:1,
				branch:'总装',
				task:'新造动车组湖南长株潭第一列',
				style:'节假日加班',
				time:'2017.09.25 16：40-20：00',
				isInspected:'是',
				remarks:'若有异常顺延次日'
			}]
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

var url = 'mongodb://localhost/imooc';
mongoose.createConnection(url);

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
	res.render('qdjzxmb',{
		title:'青岛机车车辆监造项目部',
			overTimeWorkApplication:overTimeWorkApplication,
			receivedDocuments:receivedDocuments
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
	res.render('jgyjjllist',{
		title:'检修动车组验收动态',
			jgyjjls:[{
				_id:1,
				chexing:'CRH2A',
				liehao:'CRH2001',
				xiucheng:'五级修',
				peishuju:'兰州局',
				shangbuDate:'2017.9.10',
				shangbuPerson:'刘承波',
				xiabuDate:'2017.9.10',
				xiabuPerson:'肖晓斌',
				jgyjjldate:'2017.9.10',
				jgyjjlSN:'091JLJ103201709005',
				jgyjjlPerson:'肖晓斌',
				beizhu:'肖晓斌',
				bianzu:'9月19日编组'
			},{
				_id:1,
				chexing:'CRH2A',
				liehao:'CRH2001',
				xiucheng:'五级修',
				peishuju:'兰州局',
				shangbuDate:'2017.9.10',
				shangbuPerson:'刘承波',
				xiabuDate:'2017.9.10',
				xiabuPerson:'肖晓斌',
				jgyjjldate:'2017.9.10',
				jgyjjlSN:'091JLJ103201709005',
				jgyjjlPerson:'肖晓斌',
				beizhu:'肖晓斌',
				bianzu:'9月19日编组'
			},{
				_id:1,
				chexing:'CRH2A',
				liehao:'CRH2001',
				xiucheng:'五级修',
				peishuju:'兰州局',
				shangbuDate:'2017.9.10',
				shangbuPerson:'刘承波',
				xiabuDate:'2017.9.10',
				xiabuPerson:'肖晓斌',
				jgyjjldate:'2017.9.10',
				jgyjjlSN:'091JLJ103201709005',
				jgyjjlPerson:'肖晓斌',
				beizhu:'肖晓斌',
				bianzu:'9月19日编组'
		}]
	})
})



// 加班情况 jiban page
app.get('/jiaban',function(req,res){
	res.render('jiaban',{
		title:'加班申请情况',
			overTimeWorkApplication:overTimeWorkApplication
	})
})

// 收文记录 shouwenjilu page
app.get('/shouwenjilu',function(req,res){
	res.render('shouwenjilu',{
		title:'部门收文记录台账',
			receivedDocuments:receivedDocuments
	})
})

//回修通知单统计表 hxtzdlist page
app.get('/hxtzdlist',function(req,res){
	res.render('hxtzdlist',{
		title:'回修通知单统计表',
			hxtzds:hxtzds
	})
})