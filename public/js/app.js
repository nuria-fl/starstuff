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

var eventDirective = require('./directives/eventDirective');
var scrollDirective = require('./directives/scrollDirective');
var photoDirective = require('./directives/photoDirective');

var filters = require('./filters/filters');

angular.module('starstuff', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'bootstrapLightbox', 'datePicker', routes, controllers, EventService, UserService, IconsService, filters, eventDirective, scrollDirective, photoDirective ])