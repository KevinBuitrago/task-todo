/*global angular:true*/

const todoSrv = ($q) => {
    /**
     * @name Status
     * @example 0: Borrado; 1: Por hacer; 2: Realizada;
     */
    let todos = [];
    const responseTodoSrv = {
        getTodos: () => {
            return $q((resolve, reject) => {
                firebase.database().ref().child("todos")
                    .orderByChild("status").equalTo(1)
                    .once("value")
                    .then((events) => {
                        const data = events.val();
                        todo = [];
                        angular.forEach(data, (value, key) => {
                            if (value.status !== 0) {
                                todo.push({ idTodo: key, motivation: value.motivation, name: value.name, status: value.status, selected: false });
                            }
                        });
                        resolve(todo);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        createTodo: (todo) => {
            return $q((resolve, reject) => {
                firebase.database().ref().child("todos")
                    .push(todo)
                    .then((response) => {
                        todo.idTodo = response.id;
                        todos.push();
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        deleteTodo: (idTodo) => {
            return $q((resolve, reject) => {
                firebase.database().ref().child("todos/" + idTodo)
                    .remove()
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        editTodo: (idTodo, todo) => {
            return $q((resolve, reject) => {
                mainRef.child("todos/" + idTodo)
                    .update(todo)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    };
    return responseTodoSrv;
};
todoSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("todoSrv", todoSrv);