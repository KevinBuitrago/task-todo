/*global angular:true*/

const chatController = function (chatSrv, $q) {
    const vm = this;
    let dataChat = {}
    let idConversation = null;
    const getChatrealTime = () => {
        chatSrv.getChatRealTime()
            .then((data) => {
                dataChat = data;
                console.log(chatSrv.purgeObject(dataChat));
                if (chatSrv.purgeObject(dataChat).length > 0) {
                    idConversation = Object.keys(chatSrv.purgeObject(dataChat))[0];
                    console.log(dataChat[idConversation]);
                    vm.message = dataChat[idConversation].message;
                }
                dataChat.$watch(() => {
                    if (chatSrv.purgeObject(dataChat)) {
                        idConversation = Object.keys(chatSrv.purgeObject(dataChat))[0];
                        console.log(dataChat[idConversation]);
                        vm.message = dataChat[idConversation].message;
                    }
                });
            });
    }
    const loadCaghat = () => {
        chatSrv.getChat()
            .then((data) => {
                vm.idUser = chatSrv.getIduser();
                if (data) {
                    getChatrealTime()
                } else if (data !== "true") {
                    location.href = location.origin + "#/contac";
                } else {
                    vm.message = false;
                }
            })
    }
    vm.route = () => location.href = location.origin + "#/contac";
    vm.sendMessage = (text) => {
        if (text) {
            let arrayPromise = [];
            const newMessage = {
                message: text,
                date: new Date().getTime(),
                idConversation: (idConversation) ? idConversation : chatSrv.newKey()
            }
            arrayPromise = [chatSrv.newChat(newMessage), chatSrv.newChatContact(newMessage)]
            $q.all(arrayPromise)
                .then(() => {
                    loadCaghat();
                    vm.text = "";
                })
        }
    }
    loadCaghat();
};
chatController.$inject = ["chatSrv", "$q"];
angular.module("phonecatApp").controller("chatController", chatController);