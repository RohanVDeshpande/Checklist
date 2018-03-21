var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname +'/public'))

var first_name = 'Rohan';

app.get('/', function(req, res){
	res.render('index',{User:first_name})
});

app.listen(3000, function(){
	console.log('Server started on port 3000')
});