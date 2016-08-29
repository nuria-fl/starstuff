angular.module('VisibilityService', []).factory('Visibility', [function() {

	    return {
	        getVisibility : function () {
				var visibility = [
					{ 
						name: 'Visible to the naked eye',
						iconName: 'iconEye',
						selected: false 
					},
					{ 
						name: 'Visible with binoculars',	
						iconName: 'iconBinoculars',
						selected: false 
					},
					{ 
						name: 'Visible with telescope',	
						iconName: 'iconTelescope',
						selected: false 
					},
					{ 
						name: 'Not visible',	
						iconName: 'iconEyeSlash',
						selected: false 
					}
				];

				return visibility;
			}
	    };
	}]);
module.exports = 'VisibilityService';