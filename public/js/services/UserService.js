// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        get : function(username) {
            return $http.get('/api/user/'+username);
        },
        addEvent : function(username,eventId) {
            return $http.post('/api/user/' + username +'/add-event/'+eventId);
        },
        removeEvent : function(username,eventId) {
            return $http.post('/api/user/' + username +'/remove-event/'+eventId);
        }
    }       

}]);