var angular = require('angular');
var angularRoute = require('angular-route');
var angularDatepicker = require('angular-datepicker');
var angularCookies = require('angular-cookies');
var ngFileUpload = require('ng-file-upload');

var routes = require('./appRoutes');
var controllers = require('./controllers/');

var EventService = require('./services/EventService');
var UserService = require('./services/UserService');
var IconsService = require('./services/IconsService');



// public/js/app.js
angular.module('starstuff', ['ngRoute', 'ngCookies', 'datePicker', routes, controllers, EventService, UserService, IconsService, 'Filters', 'eventDirective', 'scrollDirective' ]);