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
movies:[{
title:'钢铁侠1',
_id:1,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
},{
title:'钢铁侠2',
_id:2,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
},{
title:'钢铁侠3',
_id:3,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
},{
title:'钢铁侠4',
_id:4,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
},{
title:'钢铁侠5',
_id:5,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
},{
title:'钢铁侠6',
_id:6,
poster:'https://img3.doubanio.com/view/photo/photo/public/p725871004.jpg'
}]
});
});

//detail page
app.get('/movie/:id',function(req,res){
res.render('detail',{
title:'demo1 详情页',
movie:{
director:'javan',
country:'china',
title:'钢铁侠',
year:2014,
poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
language:'chinese',
flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
}
});
});

//list page
app.get('/admin/list',function(req,res){
res.render('list',{
title:'demo1 列表页',
movies:[{
_id:1,
director:'javan',
country:'china',
title:'钢铁侠',
year:2014,
poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
language:'chinese',
flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
},{
_id:2,
director:'javan',
country:'china',
title:'钢铁侠',
year:2014,
poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
language:'chinese',
flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
}]
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
