angular.module('CategoriesService', []).factory('Categories', [function() {

	    return {
	        getCategories : function () {
				var categories = [
					{ 
						name: 'Moon',    			
						iconName: 'iconMoon',
						selected: false 
					},
					{ 
						name: 'Sun',
						iconName: 'iconSun',
						selected: false 
					},
					{ 
						name: 'Stars and planets',
						iconName: 'iconPlanets',
						selected: false 
					},
					{ 
						name: 'Meteor showers',   
						iconName: 'iconMeteorShower',
						selected: false 
					},
					{ 
						name: 'Comets', 
						iconName: 'iconComets',
						selected: false 
					},
					{ 
						name: 'Eclipses',
						iconName: 'iconEclipse',
						selected: false 
					},
					{ 
						name: 'Mission Updates',
						iconName: 'iconMissionUpdates',	
						selected: false 
					}
				];

				return categories;
			}
	    }       

	}]);
