/*global angular:true*/
/*global firebase:true*/

var galleryController = function (phonecatAppSrv) {
    var vm = this;
    console.log("firebase",firebase);
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var filesRef = storageRef.child('gallery');
    vm.images = null;
    vm.test = () => {
        console.log("asdsd");
    };

    vm.uploadFile = function (file) {
        console.log("Let's upload a file!");
        console.log($scope.file);
        storageRef.child(file.name).put(file);
        storageRef.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        }, function () {
            //handle error
        }, function () {
            //url of storage file 
            var downloadURL = storageRef.snapshot.downloadURL;
            console.log(downloadURL)
            //you will get url of snapshot
        });
    };

    const getImages = (() => {
        phonecatAppSrv.getFileReader();
    })
    vm.delete = (() => { })
    console.log(vm);
};
galleryController.$inject = ["phonecatAppSrv"];
angular.module("phonecatApp").controller("galleryController", galleryController);




