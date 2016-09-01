// public/js/services/ImageService.js
angular.module('ImageService', []).factory('Image', ['$http', function($http) {

    return {
        get : function(limit) {
            var lim = limit ? limit : '0';
            return $http.get('/api/images/?limit='+limit);
        },
        getById : function(imageId) {
            return $http.get('/api/image/' + imageId);
        },
        getByUser : function(user) {
            return $http.get('/api/user/' + user + '/images/');
        },
        getByEvent : function(eventId) {
        	return $http.get('/api/images/event/' + eventId);	
        }
    }       

}]);
module.exports = 'ImageService';