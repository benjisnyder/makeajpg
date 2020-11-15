'use strict';

/* Filters */

angular.module('myApp.filters', []).

	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]).

	filter('round', function() {
		return function(string) {
			var integ = parseInt(string);

			if (integ) {
				return Math.ceil(parseInt(string));
			} else {
				return string;
			}
		};
	}).
	
	filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	});