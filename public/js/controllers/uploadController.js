angular.module('uploadController', ['ngFileUpload'])
	.controller('uploadController', ['$scope', '$rootScope', 'Upload', '$timeout', function ($scope, $rootScope, Upload, $timeout) {

		console.log($rootScope)
		$scope.uploadPic = function(file) {
			file.upload = Upload.upload({
				url: 'api/user/uploads',
				method: 'POST',
				data: {
					username: $rootScope.user, 
					event: $scope.$parent.event._id,
					file: file
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
	}]);