/*global angular:true*/

const runHome = function ($rootScope, $location) {
	"use strict";
};
runHome.$inject = ["$rootScope", "$location"];
angular
	.module("phonecatApp", ["ngRoute", "firebase"])
	.run(runHome);
/**
* @ngdoc index
* @name app
* @description
* # app
*
* Main modules of the application.
* 
*/
firebase.initializeApp(firebaseConfig);
const mainRef = firebase.database().ref();

const projectConfig = function ($routeProvider) {
	$routeProvider
		.when('/gallery', {
			templateUrl: "views/gallery.html"
		})
		.when('/task', {
			templateUrl: "views/task.html"
		})
		.when('/chat', {
			templateUrl: "views/chat.html"
		})
		.when('/contac', {
			templateUrl: "views/contac.html"
		})
		.otherwise({
			redirect: '/gallery'
		});

};
projectConfig.$inject = ["$routeProvider"];
angular.module("phonecatApp").config(projectConfig);


