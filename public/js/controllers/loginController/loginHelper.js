function loginHelper ( $scope, $cookies, $location, $routeParams, User ) {
	
	if(User.getToken()){
		// if the user is logged in we redirect them to their profile
		$location.path('/myprofile/');
	}

	$scope.user = {};
	$scope.login = function(){
		User.logIn($scope.user)
			.then(function(dataUser){
				if(dataUser.data.token){
					User.saveToken(dataUser.data.token);
					$location.path('/myprofile/');	
				} else {
					$location.path('/login/error')
				}
			})
	}

	//if the user couldn't be found the server will redirect the user to the login page with an ERROR parameter (need to do this in a better way)
	if($routeParams.ERROR){
		$scope.showError = true;
	} else {
		$scope.showError = false;
	}
}
module.exports = loginHelper;