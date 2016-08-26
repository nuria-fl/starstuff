angular.module('AddedItemsService', [])
	.factory('AddedItems', ['User', function(User) {

	    return {
	        getAddedItems : function(user) {

	        	return new Promise(function(resolve, reject) {
	        		var addedItems = [];
					if(user){
						User.get(user)
							.then(function(dataUser){
								var dataUser = dataUser.data[0];
								addedItems = dataUser.events;					
								resolve(addedItems);
							});
					} else {
						reject('no user found');
					}
	        	});
	        }
	    };

	}]);