"use strict";

var app = angular.module("employee_directory", []).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	/*$urlProvider.otherwise("/login");

	$stateProvider.state("dashboard", {
		url: "/home/dashboard".
		templateUrl: "app/pages/dashboard/dashboard.html",
		controller: "dashboardController"
	});*/ 

	$stateProvider.state("employee_directory", {
		url: "/",
		templateUrl: "app/pages/home/home.html",
		controller: "home_controller as hc"
	})
})