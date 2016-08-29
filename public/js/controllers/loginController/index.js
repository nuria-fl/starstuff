angular.module('loginController', [])
	.controller( 'loginController' , function ( $scope, $cookies, $location, $routeParams ) {

		if($cookies.get('userCookie')){
			// if the user is logged in we redirect them to their profile
			$location.path('/user/'+$cookies.get('userCookie'))
		}

		//if the user couldn't be found the server will redirect the user to the login page with an ERROR parameter (need to do this in a better way)
		if($routeParams.ERROR){
			$scope.showError = true;
		} else {
			$scope.showError = false;
		}
	})
module.exports = 'loginController';