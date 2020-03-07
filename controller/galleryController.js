/*global angular:true*/
/*global firebase:true*/

const galleryController = function (phonecatAppSrv) {
    const vm = this;
    vm.galleries = [];
    vm.uploadFile = (form, file) => {
        phonecatAppSrv.uploadFile(file)
            .then(() => {
                vm.listGallery();
            })
            .catch(() => {
                alert("Hubo un problema al subir la imagen");
            });
    };
    vm.listGallery = () => {    
        phonecatAppSrv.loadGalleries()
            .then(() => {
                vm.galleries = phonecatAppSrv.getGalleries();
            })
            .catch((error) => {
            });
    };

    (() => {
        vm.listGallery();
    })();
};
galleryController.$inject = ["phonecatAppSrv"];
angular.module("phonecatApp").controller("galleryController", galleryController);




