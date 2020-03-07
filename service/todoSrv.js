/*global angular:true*/

const todoSrv = function ($q) {
    /**
     * @name Status
     * @example 0: Borrado; 1: Por hacer; 2: Realizada;
     */
    let todos = [];
    const responseTodoSrv = {
        getTodos: () => {
            return $q((resolve, reject) => {
                firebase.database().ref().child("todos")
                    .once("value")
                    .then((events) => {
                        console.log("VEmoas la data", events.val());
                        resolve(resolve);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        createTodo: (todo) => {
            firebase.database().ref().child("todos")
                .push(todo)
                .then((response) => {
                    todo.idTodo = response.id;
                    todos.push(events);
                    console.log(response);
                })
                .catch((error) => {
                    reject(error);
                });
        },
        deleteTodo: (idTodo) => {
            firebase.database().ref().child("todos")
                .push(todo)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    reject(error);
                });
        },
        editTodo: (idTodo, todo) => {

        }
    };
    return responseTodoSrv;
};
todoSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("todoSrv", todoSrv);