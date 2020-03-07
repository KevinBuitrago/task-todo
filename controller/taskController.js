/*global angular:true*/
const taskController = function ($scope) {
    console.log("LLega al controlador");
    const vm = this;
    console.log("THIS", vm);
    vm.listTodos = () => {
        console.log("asdasd");
    }
    vm.testOne = () => {
        console.log("test");
    };
};
taskController.$inject = ["$scope"];
angular.module("phonecatApp").controller("taskController", taskController);