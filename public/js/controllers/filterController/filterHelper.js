function filterHelper($scope, Categories, Visibility){
	//get array of categories and visibility types from service
	$scope.categories = Categories.getCategories();
	$scope.visibility = Visibility.getVisibility();

	// prepare an array to store the selection
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
	
	// handle the show/hide of the category and visibility filter
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
}
module.exports = filterHelper;