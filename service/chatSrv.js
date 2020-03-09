"use strict";
/*global angular:true*/
/*global firebase:true*/

var chatSrv = function ($q) {
    let idSender = null,
        idReceiver= null;
    var responsechatSrv = {
        // getChat: function (idUser, idcontac) {
        //     return $q(function (resolve, reject) {
        //         var url = "/chat/" + idUser + "/" + idcontac;
        //         $firebaseObject(firebase.database().ref().child(url))
        //         .$loaded((data) => {
        //             if (data) {
        //                 resolve(data);
        //             } else {
        //                 reject("GENERAL.GENERIC_ERROR");
        //             }
        //         });
        //     });
        // },
        saveUsers: (idUser, idContac) =>{
            idSender = idUser;
            idReceiver = idContac;
        },
        getChat: () => {
            return $q(function (resolve, reject) {
                var url = "/chat/" + idSender + "/" + idReceiver;
                firebase.database().ref().child(url)
                    .once("value")
                    .then((events) => {
                        let result = null;
                        if (events.val() && idSender && idReceiver) {
                            result = events.val();
                        } else if (idSender && idReceiver) {
                            result = "true";
                        }
                        resolve(result);
                    });
            });
        },
        getIduser: () => idSender,
        newKey: () => firebase.database().ref().child("/chat/" + idSender + "/" + idReceiver).push().key,
        newChat: (data) => {
            return $q(function (resolve, reject) {
                data.idSender = idSender;
                data.idReceiver = idReceiver;
                firebase.database().ref().child("/chat/" + idSender + "/" + idReceiver + "/" + data.idConversation + "/message")
                    .push(data)
                    .then(() => resolve(true))
                    .catch(() => reject(false))
            });
        },
        newChatContact: (data) => {
            return $q(function (resolve, reject) {
                data.idSender = idSender;
                data.idReceiver = idReceiver;
                firebase.database().ref().child("/chat/" + idReceiver + "/"  + idSender +  "/" + data.idConversation + "/message")
                    .push(data)
                    .then(() => resolve(true))
                    .catch(() => reject(false))
            });
        }
    };
    return responsechatSrv;
};
chatSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("chatSrv", chatSrv);