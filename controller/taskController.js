/*global angular:true*/
const taskController = function (todoSrv) {
    console.log("LLega al controlador");
    const vm = this;
    console.log("THIS", vm);
    const listTodos = () => {
        todoSrv.getTodos();       
    }
    vm.testOne = () => {
        console.log("test");
    };

    (() => {
        listTodos();
    })();
};
taskController.$inject = ["todoSrv"];
angular.module("phonecatApp").controller("taskController", taskController);