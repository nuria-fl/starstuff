var angular = require('angular');
var angularRoute = require('angular-route');
var angularDatepicker = require('angular-datepicker');
var angularCookies = require('angular-cookies');
var ngFileUpload = require('ng-file-upload');

var routes = require('./appRoutes');
var controllers = require('./controllers/MainCtrl');


// public/js/app.js
angular.module('starstuff', ['ngRoute', 'ngCookies', 'datePicker', routes, controllers, 'EventService', 'UserService', 'Filters', 'eventDirective', 'scrollDirective', 'IconsService']);