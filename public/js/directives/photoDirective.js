angular.module('photoDirective', [])
	.directive('photo', function() {
		return {
			restrict: 'E',
			scope: {
				image: '=',
				openLightboxModal: '&',
			},
			templateUrl: 'views/photo.html'
		};
	});

module.exports = 'photoDirective';