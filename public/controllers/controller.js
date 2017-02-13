var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
	console.log("Hello World from controller!");

$http.get('/contactlist').success(function(res) {
	console.log("I got the data I requested");
	$scope.contactlist = res;
});

});
