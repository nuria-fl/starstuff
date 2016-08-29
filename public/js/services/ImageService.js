// public/js/services/ImageService.js
angular.module('ImageService', []).factory('Image', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/images/');
        },
        getById : function(imageId) {
            return $http.get('/api/image/' + imageId);
        },
    }       

}]);