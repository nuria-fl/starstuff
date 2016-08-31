var imagesHelper = require('./imagesHelper');

angular.module('imagesController',  [ 'ui.bootstrap' ])
	.controller('imagesController', imagesHelper);

module.exports = 'imagesController';