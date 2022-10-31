var MongoClient = require('mongodb').MongoClient;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

const neatCsv = require('neat-csv');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

// 如果我們要把後台mondoDB資料庫裡的資料傳到前端顯示在前端畫面上的話，此時我們要在路由上面設計
app.get('/json',function(req , res , next){
  MongoClient.connect("mongodb://127.0.0.1",function(err,db){ //這一段開啟資料庫的寫法和下面一樣
    if(!err){
      var dbo = db.db('myDemo')
      dbo.collection('userList').find().toArray(function(err,data){
        // 這裡用find方式去取得這裡面所有資料，如果用find需要注意的是他find出來會是物件，如果未來要拿裡面json資料的話後面還要做個toArray的動作
        if(!err){
          res.json(data)
          // response他有提供可以透過.json的方式就可以把資料吐出來
        }
      })
    }
  })
})

// 新增的index.html使用區域 ---------------------------------------------------------

app.get('/senddata', function(req , res , next){ //有需要用到next的時候再帶進來就好
  var username = req.query.username  //因為我們要接收參數,所以要透過 req.query 的方式就可以接收參數,最好是對應到剛剛在index.html裡面設定的名稱
  var phone = req.query.phone
  var email = req.query.email
  console.log(username , phone ,email);

  MongoClient.connect("mongodb://127.0.0.1",function(err,db){
    if(!err){
      var dbo = db.db('myDemo')
      dbo.collection("userList").insert({username:username,phone:phone,email:email},function(err,result){
        if(!err){
          console.log("寫入成功")
        }else{
          console.log("寫入失敗")
        }
      });
    }else{
      console.log("連線失敗",err);
    }
    res.end()
  })
}); 

// ----------------------------------------------------------------------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
