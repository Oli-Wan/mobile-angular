'use strict';

describe('MissionsController', function(){
	beforeEach(module('smurAngular'));

	var scope, ctrl;

	beforeEach(inject(function($controller, $rootScope, $location ) {
		scope = $rootScope.$new();
		ctrl = $controller("MissionsController", {
			$scope: scope,
			$location: $location,
			$modal: "",
			Mission: ""
		});
	}));

	it('should have missions', function() {
		expect(scope.missions[0].id).toMatch("1003");
	});
});