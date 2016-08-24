angular.module('Filters', [])
    .filter("dateFilter", function() {
    	return function(events, from, to) {
    		var result = [];   
            console.log(from)
            console.log(to)
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

        return function(events, selection, selectionVisibility) {

        	if(selection.length || selectionVisibility.length ){
        		return events.filter(function(event) {

        		    for (var i in event.category) {

                        if(selection.length && selectionVisibility.length){
                            // if we have both filters enabled we filter elements that match both conditions
                            if (selection.indexOf(event.category[i]) != -1 && selectionVisibility.indexOf(event.visibility) != -1) {
                                return true;
                            }
                        } else {
                            // else we just match for the enabled filter
                            if (selection.indexOf(event.category[i]) != -1 || selectionVisibility.indexOf(event.visibility) != -1) {
                                return true;
                            }    
                        }
        		        
        		    }
        		    return false;

        		});
        	} else {
        		return events;
        	}
            
        };
    })