angular.module('eventDirective', [])
	.directive('eventPreview', function() {
		return {
			restrict: 'E',
			scope: {
				activePage: '=',
				event: '=info',
				iconvisibility: '&',
				iconcategory: '&',
				addcal: '&',
				removecal: '&',
				added: '&',
				user: '='
			},
			templateUrl: 'views/event-preview.html'
		};
	});
module.exports = 'eventDirective';