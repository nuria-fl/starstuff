angular.module('loginController', [])
	.controller( 'loginController' , function ( $scope, $cookies, $location, $routeParams ) {
		if($cookies.get('userCookie')){
			$location.path('/user/'+$cookies.get('userCookie'))
		}

		if($routeParams.ERROR){
			$scope.showError = true;
		} else {
			$scope.showError = false;
		}
	})