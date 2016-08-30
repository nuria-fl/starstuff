var CategoriesService = require('../../services/CategoriesService');
var VisibilityService = require('../../services/VisibilityService');
var filterHelper = require('./filterHelper');

angular.module('filterController', [CategoriesService, VisibilityService])
	.controller('filterController', filterHelper)

module.exports = 'filterController';