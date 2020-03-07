/*global angular:true*/
const taskController = function ($scope) {

    $scope.listTodos = () => {
        console.log("asdasd");
    }
    $scope.test = () => {
        console.log("test");
    };
};
taskController.$inject = ["$scope"];
angular.module("phonecatApp").controller("taskController", taskController);