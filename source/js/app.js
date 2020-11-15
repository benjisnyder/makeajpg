'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
	]).

	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {templateUrl : 'partials/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/terms', {templateUrl: 'partials/terms.html'});
		$routeProvider.when('/about', {templateUrl: 'partials/about.html'});
		//$routeProvider.when('/v/:id', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
		$routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: 'NewCtrl'});
		$routeProvider.when('/e/:id', {templateUrl : 'partials/edit_buffer.html', controller : 'EditBuffer'});
		$routeProvider.when('/edit/:id', {templateUrl : 'partials/edit.html', controller : 'EditCtrl', resolve : {
			sessionArtboard : ['$location', '$route', 'DB', function($location, $route, DB) {
				var artboardID = $route.current.params.id,
					artboard = DB.getSessionArtboard(); // check if session artboard was already created (if so, user went to /new first)
				
				if (!artboardID) {
					// user tried to go to edit/
					$location.path('/');
					return;
				} else if (!artboard && artboardID) {
					// user tried going to edit/{artboardID} so, redirect to buffer first to retrieve the artboard
					$location.path('/e/' + artboardID);
					return;
				} else if (artboard && (artboard.id !== artboardID)) {
					// something went horribly wrong or the artboard does not exist
					alert('That artboard does not exist. Sorry, friend.');
					$location.path('/');
					return;
				}

				return artboard;
			}]
		}});
		$routeProvider.otherwise({redirectTo: '/'});
		//$locationProvider.html5Mode(true);
	}]).
	
	run(function() {
		// optional init stuff, try not to put stuff here if possible
	});
