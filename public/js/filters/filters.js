angular.module('Filters', [])
    .filter("dateFilter", function() {
    	return function(events, from, to) {
    		var result = [];   
            if(events){
                events.forEach(function(elem, i){
                    var eventDate = new Date(elem.date);
                    if (eventDate > from && eventDate < to)  {
                        result.push(elem);
                    }
                })
            }     		           
    		return result;
    	};
    })
    .filter('selectedFilters', function() {

        return function(events, selection) {
        	if(selection.length){
        		return events.filter(function(event) {

        		    for (var i in event.category) {

        		        if (selection.indexOf(event.category[i]) != -1 || selection.indexOf(event.visibility) != -1) {
        		            return true;
        		        }
        		    }
        		    return false;

        		});
        	} else {
        		return events;
        	}
            
        };
    })