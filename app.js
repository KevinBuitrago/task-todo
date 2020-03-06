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
	console.log("asdasd", firebase);
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();


	var projectConfig = function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: "views/gallery.html"
			})
	};
	projectConfig.$inject = ["$routeProvider"];
	angular.module("phonecatApp", ["ngRoute"]).config(projectConfig);
})();
