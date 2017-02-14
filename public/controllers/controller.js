var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    console.log("Hello World from controller!");

    function refresh() {
        $http.get('/contactlist').then(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response.data;
            console.log(response);
        });
    }

    refresh();

    $scope.addContact = function() {
        console.log($scope.person);
        $http.post('/addcontact', $scope.person).then(function(response) {
            console.log(response);
            refresh();
            $scope.person = "";
        });
    };
});
