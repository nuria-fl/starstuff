angular.module('uploadController', ['ngFileUpload'])
	.controller('uploadController', ['$scope', '$rootScope', 'Upload', '$timeout', function ($scope, $rootScope, Upload, $timeout) {

		$scope.uploadPic = function(file, title) {
			file.upload = Upload.upload({
				url: 'api/user/uploads',
				method: 'POST',
				data: {
					title: title,
					file: file,
					username: $rootScope.user, 
					event: [{
						id: $scope.$parent.event._id,	
						name: $scope.$parent.event.name,
						category: $scope.$parent.event.category,
						date: $scope.$parent.event.date
					}]					
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
module.exports = 'uploadController';