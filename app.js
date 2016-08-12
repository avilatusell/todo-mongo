var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// use Jade for HTML rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// folder for Static Files (css, js, img....)
app.use( express.static(__dirname + '/public') )

// Connection URL
var url = 'mongodb://localhost:27017/toDo';

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	
	app.post('/task', function(req, res) {
		// req.param 
	})

	app.get('/tasks', function(req, res) {

		db.collection("tasks")
			.find( { completed: false })
			.toArray(function(err, todoTasks) {
				console.log("todo....", todoTasks)
				var dataTemplate = { 
					title: "TO-DO Tasks",
					tasks: todoTasks 
				}
				res.render(  "tasks", dataTemplate )		
			})
		
	})

	app.get('/tasks/completed', function(req, res) {

		db.collection("tasks")
			.find( { completed: true })
			.toArray(function(err, completedTasks) {
				console.log("completed...", completedTasks)
				var dataTemplate = { 
					title: "Complete Tasks",
					tasks: completedTasks 
				}
				res.render( "tasks", dataTemplate  )		
			})
		
	})

	app.listen(3000, function() {
		console.log("Listening on port 3000")
	});


})

