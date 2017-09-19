var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ =require('underscore')
var Movie=require('./models/movie.js')
var bodyParser=require("body-parser")
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'pug')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.listen(port)

console.log('imooc started on port ' + port)

//index page
app.get('/',function(req,res){
	Movie.fetch(function(err, movies){
		if (err){
			console.log(err)
		}
		res.render('index',{
			title:'demo1 首页1',
			movies:movies
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
});
});
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
});
});
