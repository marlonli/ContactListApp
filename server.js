var express = require('express');
var app = express();

// app.get('/', function (req, res) {
// 	response.send("Hello Word from server.js")
// });

app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(req, res) {
	console.log("I recerved a GET request")

	person1 = {
		name: "Tim",
		email: "tim@email.com",
		number: "(111) 111-1111"
	};

	person2 = {
		name: "Emily",
		email: "emily@email.com",
		number: "(222) 222-2222"
	};

	person3 = {
		name: "John",
		email: "John@email.com",
		number: "(333) 333-3333"
	};

	var contactlist = [person1, person2, person3];
	res.json(contactlist);
});

app.listen(3000);
console.log("Server running on port 3000");