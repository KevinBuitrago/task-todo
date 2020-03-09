var contaChatController = function (chatSrv) {
    var vm = this;
vm.saveUserandContac = (idUser, idContac) =>{
  chatSrv.saveUsers(idUser, idContac);
  location.href = location.origin + "#/chat"
}
};
contaChatController.$inject = ["chatSrv"];
angular.module("phonecatApp").controller("contaChatController", contaChatController);