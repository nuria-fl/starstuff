function uploadHelper ($scope, $rootScope, Upload, $route) {

	$scope.uploadPic = function(file, title, eventId) {
		file.upload = Upload.upload({
			url: 'api/user/uploads',
			method: 'POST',
			data: {
				title: title,
				file: file,
				username: $rootScope.user, 
				eventId: eventId
			}
		});

		file.upload.then(function (response) {
			file.result = response.data;
		}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
		}, function (evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			setTimeout(function(){
				$route.reload();
			}, 1000)
		});
	}
}
module.exports = uploadHelper;