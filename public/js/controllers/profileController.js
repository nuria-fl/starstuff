angular.module('profileController', [])
	.controller( 'profileController' , function ( $scope, $cookies, $location, User, Event, Icons ) {
		if($cookies.get('userCookie')){
			var user = $cookies.get('userCookie');
			User.get(user)
				.then(function(dataUser){
					var user = dataUser.data[0]
					var events = [];
					user.events.forEach(function(elem){
						Event.getOne( elem )
							.then(function(dataEvent){
								events.push(dataEvent.data)
							});
					});
					$scope.user = user;
					$scope.added = true;
					$scope.events = events;
					
				})
			var normalRange = {
				dateFrom: new Date(),
				dateTo: new Date('2016-12-31')
			};
			$scope.range = normalRange;
			
			$scope.reverse = false;
			$scope.viewPast = function(){
				$scope.reverse = true;
				$scope.range = {
					dateFrom: new Date('2010-12-31'),
					dateTo: new Date()
				};
			}
			$scope.viewUpcoming = function(){
				$scope.reverse = false;
				$scope.range = normalRange;
			}
			$scope.iconVisibilityName = function(event){
				return Icons.getIconVisibility(event);
			};
			$scope.iconCategoryName = function(event){
				return Icons.getIconCat(event);
			};
			$scope.logout = function(){
				$cookies.remove('userCookie')
				$location.path('/')
			}
		} else {
			$location.path('/login')
		}
	})