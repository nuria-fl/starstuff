var uploadHelper = require('./uploadHelper');

angular.module('uploadController', ['ngFileUpload'])
	.controller('uploadController', ['$scope', '$rootScope', 'Upload', '$route', '$window', uploadHelper]);
	
module.exports = 'uploadController';