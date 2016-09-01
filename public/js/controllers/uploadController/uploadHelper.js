function uploadHelper ($scope, $rootScope, Upload, $route, $window) {
	var token = $window.localStorage['jwtToken'];
	console.log(token)
	$scope.uploadPic = function(file, title, event) {
		
		file.upload = Upload.upload({
			url: 'api/user/uploads',
			method: 'POST',
			data: {
				title: title,
				file: file,
				username: $rootScope.user, 
				event: event,
				token: token
			}
		});

		file.upload.then(function (response) {
			file.result = response.data;
			console.log(response)
			if (response.status === 200){
				$route.reload();
			}
		}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;

		}, function (evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			
		});
	}
}
module.exports = uploadHelper;