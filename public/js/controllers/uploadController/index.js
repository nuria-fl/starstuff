var uploadHelper = require('./uploadHelper');

angular.module('uploadController', ['ngFileUpload'])
	.controller('uploadController', ['$scope', '$rootScope', 'Upload', '$route', uploadHelper]);
	
module.exports = 'uploadController';