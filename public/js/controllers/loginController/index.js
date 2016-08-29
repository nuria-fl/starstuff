var loginHelper = require('./loginHelper');

angular.module('loginController', [])
	.controller( 'loginController' , loginHelper);
	
module.exports = 'loginController';