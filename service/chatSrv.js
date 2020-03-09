"use strict";
/*global angular:true*/
/*global firebase:true*/

var chatSrv = function ($q, $firebaseObject) {
    let idSender = null,
        idReceiver = null;
    var firebaseConnections = {};
    var responsechatSrv = {
        getChatRealTime: function () {
            return $q(function (resolve, reject) {
                var url = "/chat/" + idSender + "/" + idReceiver;
                responsechatSrv.createConnectionURL("phonecatApp", url);
                $firebaseObject(mainRef.child(url)).$loaded()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        saveUsers: (idUser, idContac) => {
            idSender = idUser;
            idReceiver = idContac;
        },
        purgeObject: (object) => {
            var newObject = {};
            angular.forEach(object, (value, key) => {
                if (key.indexOf("$") == -1) {
                    newObject[key] = value;
                }
            });
            return newObject;
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
                firebase.database().ref().child("/chat/" + idReceiver + "/" + idSender + "/" + data.idConversation + "/message")
                    .push(data)
                    .then(() => resolve(true))
                    .catch(() => reject(false))
            });
        },
        createConnectionURL: function (module, URL) {
            if (!firebaseConnections[module]) firebaseConnections[module] = [];
            firebaseConnections[module].push(URL);
        },
    };
    return responsechatSrv;
};
chatSrv.$inject = ["$q", "$firebaseObject"];
angular.module("phonecatApp").factory("chatSrv", chatSrv);