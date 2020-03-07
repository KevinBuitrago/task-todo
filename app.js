/*global angular:true*/

(function () {
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

	var projectConfig = function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: "views/gallery.html"
			})
			.when('/task', {
				templateUrl: "views/task.html"
			})
			.otherwise({
				redirect: '/'
			});
	};	
	projectConfig.$inject = ["$routeProvider"];
	angular.module("phonecatApp", ["ngRoute"]).config(projectConfig);
})();
