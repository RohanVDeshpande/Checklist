const router = require('express').Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const user = require('../models/user-models');

const authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/');
	}
	else{
		next();
	}
};

router.get('/', authCheck, (req,res)=>{
	res.render('welcome', {User: req.user});
});

router.post('/newtask', urlencodedParser, function(req, res){
	console.log('POST:');
	console.log(req.body);
	var newTask = {'title': req.body.taskTitle,
				   'details': req.body.taskDetail};
	console.log('Before: '+ req.user.tasks);
	newTaskList = req.user.tasks;
	newTaskList.unshift(newTask);
	user.update({_id: req.user._id}, {
        tasks: newTaskList
    },function(err, numberAffected, rawResponse) {
    	if(err){
    		console.log('Task Update Error')
    	}
    	else{
    		console.log('Task Added to User');
    	}
    });
	res.send('success');
});

router.post('/reorder_task', urlencodedParser, function(req, res){
	console.log('POST:');
	console.log(req.body);
	var newTaskOrder = [];
	for(var i = 0; i <req.body.length; i++){
		newTaskOrder.push(req.user.tasks[req.body[i]]);
	}
	user.update({_id: req.user._id}, {
        tasks: newTaskOrder
    },function(err, numberAffected, rawResponse) {
    	if(err){
    		console.log('Task Update Error')
    		res.send('NOT OK');
    	}
    	else{
    		console.log('Task Added to User');
    		res.send('OK');
    	}
    });
});

router.post('/gettask', urlencodedParser, function(req, res){
	console.log('POST:');
	console.log(req.body);
	var id = req.body.id;
	if(id<req.user.tasks.length){
		var gotTask = req.user.tasks[id];
		res.send(gotTask);
	}
	else{
		res.send('ERR');
	}
});

module.exports = router;