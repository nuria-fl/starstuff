angular.module('IconsService', []).factory('Icons', ['$http', function($http, $location) {

	    return {
	        getIconVisibility : function (event) {
				var iconName = '#icon';
				if(event.visibility === 'Visible to the naked eye') {
					iconName+='Eye';
				} else if(event.visibility === 'Visible with binoculars') {
					iconName+='Binoculars';
				} else if(event.visibility === 'Visible with telescope') {
					iconName+='Telescope';
				} else {
					iconName+='EyeSlash';
				}
				return iconName;
			},
			getIconCat : function (event) {
				var iconName = '#icon';
				var categories = event.category;

				for (i=0; i<categories.length; i++){
					if ('Moon'.indexOf(categories[i]) != -1) {
					    return iconName+'Moon';
					} else if ('Earth'.indexOf(categories[i]) != -1){
						return iconName+'Earth';
					} else if ('Stars and planets'.indexOf(categories[i]) != -1){
						return iconName+'Planets';
					} else if ('Meteor showers'.indexOf(categories[i]) != -1){
						return iconName+'MeteorShower';
					} else if ('Comets and asteroids'.indexOf(categories[i]) != -1){
						return iconName+'Comets';
					} else if ('Eclipses'.indexOf(categories[i]) != -1){
						return iconName+'Eclipse';
					} else if ('Mission Updates'.indexOf(categories[i]) != -1){
						return iconName+'MissionUpdates';
					} else {
						return iconName+'Planets';
					}
				}
			}
	    }       

	}]);
