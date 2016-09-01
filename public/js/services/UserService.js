// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', '$window', function($http, $window) {

    return {
        get : function(username) {
            return $http.get('/api/user/'+username);
        },
        addEvent : function(username,eventId) {
            var token = $window.localStorage['jwtToken'];
            var url = '/api/user/' + username +'/add-event/'+eventId;
            return $http({
                method  : 'POST',
                url     : url,
                data    : {token:token}
            });
        },
        removeEvent : function(username,eventId) {
            var token = $window.localStorage['jwtToken'];
            var url = '/api/user/' + username +'/remove-event/'+eventId;
            return $http({
                method  : 'POST',
                url     : url,
                data    : {token:token}
            });
        },
        parseJwt : function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var object = JSON.parse($window.atob(base64));
            return object;
        },
        saveToken : function(token) {
            $window.localStorage['jwtToken'] = token;
        },
        getToken : function() {
            return $window.localStorage['jwtToken'];
        },
        logIn : function(data){
            return $http({
                method  : 'POST',
                url     : '/login',
                data    : data,
            });
        },
        logout : function() {
            $window.localStorage.removeItem('jwtToken');
        }

    }       

}]);
module.exports = 'UserService';