var uploadHelper = require('./uploadHelper');

angular.module('uploadController', ['ngFileUpload'])
	.controller('uploadController', ['$scope', '$rootScope', 'Upload', '$timeout', uploadHelper]);
	
module.exports = 'uploadController';