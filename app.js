var express = require('express')
var path = require('path')
var mongoose=require('mongoose')
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
res.render('index',{
title:'demo1 首页1',
movies:movie
});
});

//detail page
app.get('/movie/:id',function(req,res){
res.render('detail',{
title:'demo1 详情页',
movie:movie
});
});

//list page
app.get('/admin/list',function(req,res){
res.render('list',{
title:'demo1 列表页',
movies:movie
});
});

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
