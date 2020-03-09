/*global angular:true*/

const chatController = function (chatSrv, $q) {
    const vm = this;
    
    let idConversation = null;
    const loadCaghat = () => {
        chatSrv.getChat()
            .then((data) => {
                vm.idUser = chatSrv.getIduser();
                if (data) {
                    idConversation = Object.keys(data)[0];
                    vm.message = data[idConversation].message;
                } else if (data !== "true") {
                    location.href = location.origin + "#/contac";
                }else{
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