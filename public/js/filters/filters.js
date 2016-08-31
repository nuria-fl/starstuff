angular.module('Filters', [])
    .filter("dateFilter", function() {
    	return function(events, from, to) {
    		var result = [];   
            var fromTimestamp = from.getTime();
            var toTimestamp = to.getTime();
            if(events){
                events.forEach(function(elem, i){
                    var eventDate = elem.date;
                    if (eventDate > fromTimestamp && eventDate < toTimestamp)  {
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
    .filter('selectedFiltersImages', function() {
        return function(images, selection) {
            console.log(images)
            if(selection.length ){
                return images.filter(function(image) {
                    for (var i in image.event[0].category) {
                        if (selection.indexOf(image.event[0].category[i]) != -1) {
                            return true;
                        }       
                    }
                    return false;
                });
            } else {
                return images;
            }
        };
    })
module.exports = 'Filters';