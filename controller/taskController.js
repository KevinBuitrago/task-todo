/*global angular:true*/
const taskController = function (todoSrv) {
    const vm = this;
    const listTodos = () => {
        todoSrv.getTodos()
            .then((data) => {
                vm.tasks = data;
            });
    }
    vm.addTask = () => {
        vm.task.status = 1;
        todoSrv.createTodo(vm.task)
            .then((e) => {
                listTodos();
                delete vm.task;
            }).catch((err) => {
            })
    }
    vm.removeTask = (tasks) => {
        vm.tasks = tasks.filter((task) => {
            if (task.selected) {
                todoSrv.deleteTodo(task.idTodo)
                    .then(() => {
                        listTodos();
                    })
            }
        });
    }
    (() => {
        listTodos();
    })();
};
taskController.$inject = ["todoSrv"];
angular.module("phonecatApp").controller("taskController", taskController);