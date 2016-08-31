var angular = require('angular');
var angularRoute = require('angular-route');
var angularDatepicker = require('angular-datepicker');
var angularCookies = require('angular-cookies');
var ngFileUpload = require('ng-file-upload');
var bootstrapLightbox = require('angular-bootstrap-lightbox');
var uiBootstrap = require('angular-ui-bootstrap');



var routes = require('./appRoutes');
var controllers = require('./controllers/');

var EventService = require('./services/EventService');
var UserService = require('./services/UserService');
var IconsService = require('./services/IconsService');

// require('konami-js');

// public/js/app.js
angular.module('starstuff', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'bootstrapLightbox', 'datePicker', routes, controllers, EventService, UserService, IconsService, 'Filters', 'eventDirective', 'scrollDirective' ])
// .config(function (LightboxProvider) {
//   LightboxProvider.fullScreenMode = true;
// });