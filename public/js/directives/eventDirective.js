angular.module('eventDirective', [])
	.directive('eventPreview', function() {
		return {
			restrict: 'E',
			scope: {
				activePage: '=',
				event: '=info',
				iconvisibility: '&',
				iconcategory: '&'
			},
			templateUrl: 'views/event-preview.html'
		};
	});