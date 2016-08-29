var ImageService = require('../../services/ImageService');
var homeHelper = require('./homeHelper');

angular.module('homeController', [ImageService])
	.controller('homeController', homeHelper);

module.exports = 'homeController';