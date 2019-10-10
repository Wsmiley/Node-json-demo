var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
   fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   });
})

app.post("/dodelete",function(req,res){
  var id = req.body["id"];

  fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
    if(err){
      return console.error(err);
    }
    var routes = data.toString();//将二进制的数据转换为字符串
    routes = JSON.parse(routes);//将字符串转换为json对象
    for(var i = 0; i < routes.data.length;i++){
      if( id == i){
           console.log(routes.data[i])
           routes.data.splice(i,1);
           break;
      }
    }
    var str = JSON.stringify(routes);
    fs.writeFile(__dirname + "/public/" + "users.json",str, function (err){
      if(err){
        console.error(err);
      }
      console.log('----------删除成功-------------');
    });
    fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
      res.end( data );
    });
  });
});

app.post("/dopost",function(req,res){
  var params=req.body;
  console.log(params);
  fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data){
    if(err){
      return console.error(err);
    }
    var routes = data.toString();//将二进制的数据转换为字符串
    routes = JSON.parse(routes);//将字符串转换为json对象
    routes.data.push(params);//将传来的对象push进数组对象中
    var str=JSON.stringify(routes);
    fs.writeFile(__dirname + "/public/" + "users.json",str, function (err){
      if(err){
        console.error(err);
      }
      console.log('----------新增成功-------------');
    });
  });
  res.redirect(302, 'http://localhost:8081/index.html')
})


app.use(express.static("public"));

var server = app.listen(8081, function () {

  var port = "8081"

  console.log("Listening localhost:%s",  port)

})


