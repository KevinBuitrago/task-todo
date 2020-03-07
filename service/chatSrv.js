"use strict";
/*global angular:true*/
/*global firebase:true*/

var chatSrv = function ($q) {
    var responsechatSrv = {
        getChat: function (message, idChat, idUser) {
            return $q(function (resolve, reject) {
                var url = "/chat/users/" + idUser + "/"+ message + idChat;
                commonFirebaseConnectionsSrv.createConnectionURL("common", url);
                $firebaseObject(mainRef.child(url))
                    .$loaded((data) => {
                        if (data) {
                            resolve(data);
                        } else {
                            reject("GENERAL.GENERIC_ERROR");
                        }
                    });
            });
        },
    };
    return responsechatSrv;
};
chatSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("chatSrv", chatSrv);