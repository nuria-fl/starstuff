// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', '$window', function($http, $window) {

    return {
        get : function(username) {
            return $http.get('/api/user/'+username);
        },
        addEvent : function(username,eventId) {
            return $http.post('/api/user/' + username +'/add-event/'+eventId);
        },
        removeEvent : function(username,eventId) {
            return $http.post('/api/user/' + username +'/remove-event/'+eventId);
        },
        parseJwt : function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var object = JSON.parse($window.atob(base64));

            return object._doc;
        },
        saveToken : function(token) {
            $window.localStorage['jwtToken'] = token;
        },
        getToken : function() {
            return $window.localStorage['jwtToken'];
        },
        logIn : function(data){
            console.log(data)
            return $http({
                method  : 'POST',
                url     : '/login',
                data    : data,
            });
        },
        isAuthed : function(User) {

            var token = User.getToken();

            if(token) {
                var params = User.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        },
        logout : function() {
            $window.localStorage.removeItem('jwtToken');
        }

    }       

}]);
module.exports = 'UserService';