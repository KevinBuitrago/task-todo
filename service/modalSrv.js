/*global angular:true*/
var modalSrv = function ($q, $uibModal) {
    var responseCommonModalSrv = {
        showChatModal: function (dataModal, zIndex) {
            return $q((resolve, reject) => {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: dataModal.templateUrl,
                    windowClass: zIndex || "",
                    controller: dataModal.controller,
                    controllerAs: dataModal.controllerAs || "commonModal",
                    size: dataModal.size || "sm",
                    backdrop: "static",
                    keyboard: false,
                    resolve: {
                        data: function () {
                            return dataModal;
                        }
                    }
                });
                modalInstance.result.then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        }
    };
    return responseCommonModalSrv;
};
modalSrv.$inject = ["$q", "$uibModal"];
angular.module("phonecatApp").factory("modalSrv", modalSrv);