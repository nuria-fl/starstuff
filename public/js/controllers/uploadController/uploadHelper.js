function uploadHelper ($scope, $rootScope, Upload, $timeout) {
	$scope.uploadPic = function(file, title) {
		file.upload = Upload.upload({
			url: 'api/user/uploads',
			method: 'POST',
			data: {
				title: title,
				file: file,
				username: $rootScope.user, 
				eventId: $scope.$parent.event._id					
			}
		});

	file.upload.then(function (response) {
		$timeout(function () {
			file.result = response.data;
		});
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