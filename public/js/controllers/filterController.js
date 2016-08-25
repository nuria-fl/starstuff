angular.module('filterController', [])
	.controller('filterController', function($scope, Categories, Visibility){
		$scope.categories = Categories.getCategories();
		$scope.visibility = Visibility.getVisibility();

		// selected categories
		$scope.$parent.selection = [];
		$scope.$parent.selectionVisibility = [];

		// helper method to get selected categories
		$scope.selectedCategories = function selectedCategories() {
			return filterFilter($scope.categories, { selected: true });
		};

		// watch categories for changes
		$scope.$watch('categories|filter:{selected:true}', function (nv) {
			$scope.$parent.selection = nv.map(function (category) {
			  return category.name;
			});
		}, true);
		$scope.$watch('visibility|filter:{selected:true}', function (nv) {
			$scope.$parent.selectionVisibility = nv.map(function (visibility) {
			  return visibility.name;
			});
		}, true);
		
		$scope.showFilterCat = false;
		$scope.showFilterVisibility = false;

		$scope.toggleFilterCat = function(){
			$scope.showFilterVisibility = false;
			if($scope.showFilterCat === true){
				$scope.showFilterCat = false;
			} else {
				$scope.showFilterCat = true;
			}
		}

		$scope.toggleFilterVisibility = function(){
			$scope.showFilterCat = false;
			if($scope.showFilterVisibility === true){
				$scope.showFilterVisibility = false;
			} else {
				$scope.showFilterVisibility = true;
			}
		}
	})