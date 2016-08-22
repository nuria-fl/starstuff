// public/js/services/EventService.js
angular.module('EventService', []).factory('Event', ['$http', function($http) {

    return {
        // call to get all events
        get : function() {
            return $http.get('/api/events');
        },


        getOne : function( id ) {
            console.log(id)
            return $http.get('/api/event/'+id);
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new event
        // create : function(eventData) {
        //     return $http.post('/api/events', eventData);
        // },

        // call to DELETE a event
        // delete : function(id) {
        //     return $http.delete('/api/events/' + id);
        // }
    }       

}]);