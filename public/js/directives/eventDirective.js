angular.module('eventDirective', [])
	.directive('eventPreview', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      event: '=info'
	    },
	    templateUrl: 'views/event-preview.html'
	  };
	});