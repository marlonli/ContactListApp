var express = require('express');
var app = express();
var mongojs = require('mongojs');
// var ObjectId = require('mongodb').ObjectId;
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

// db.on('ready', function () {
//     console.log('database connected')
// });

// app.get('/', function (req, res) {
// 	response.send("Hello Word from server.js")
// });

app.use(express.static(__dirname + "/public"));// /public/img will be shown as /img
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	console.log("I recerved a GET request")

	db.contactlist.find(function(err, docs) {
		// console.log(docs);
		res.json(docs);
	})
});

app.post('/addcontact', function(req, res){
	console.log(req.body); //npm install body-parser
	db.contactlist.insert(req.body, function(err, doc){ // doc represents the item we parsed and received
		res.json(doc);	// send back to controller
		console.log("res=============");
		console.log(doc);
	});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log("deleted");
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
		console.log(doc);
	})
});

app.put('/contactlist2', function(req, res) {
	var id = req.body._id;
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, 
		function(err, doc) {
			res.json(doc);
		});
});
	// person1 = {
	// 	name: "Tim",
	// 	email: "tim@email.com",
	// 	number: "(111) 111-1111"
	// };

	// person2 = {
	// 	name: "Emily",
	// 	email: "emily@email.com",
	// 	number: "(222) 222-2222"
	// };

	// person3 = {
	// 	name: "John",
	// 	email: "John@email.com",
	// 	number: "(333) 333-3333"
	// };

	// var contactlist = [person1, person2, person3];
	// res.json(contactlist);


app.listen(3000);
console.log("Server running on port 3000");