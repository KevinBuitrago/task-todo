/*global angular:true*/

var galleryController = function (phonecatAppSrv) {
    var vm = this;
    vm.images = null;
    vm.test = () => {
        console.log("asdsd");

    };
    vm.uploadedFile = (element) => {
        console.log("fdfd", element);
        // vm.$apply((dd) => {
        //     vm.files = element.files;
        //     console.log("vm.files,", vm.files);
        // });
    }
    const getImages = (() => {
        phonecatAppSrv.getFileReader();
    })
    vm.delete1 = (() => { })
    vm.upload = () => {
        console.log(vm.images);
        // if (fileToUpload) {
        //     let storageRef = firebase.storage().ref(fileToUpload.name);
        //     let storage = $firebaseStorage(storageRef);
        //     let uploadTask = storage.$put(fileToUpload);
        //     uploadTask.$complete((snapshot) => {
        //         let ref = firebase.database().ref("Files");
        //         let pushKey = ref.push().key;
        //         let formData = $firebaseObject(ref.child(pushKey));
        //         formData.name = fileToUpload.name;
        //         formData.timestamp = firebase.database.ServerValue.TIMESTAMP;
        //         formData.url = snapshot.downloadURL;
        //         formData.$save().then(() => {
        //             angular.element("input[type='file']").val(null);
        //             fileToUpload = null;
        //         })
        //     });
    }
    console.log(vm);
};
galleryController.$inject = ["phonecatAppSrv"];
angular.module("phonecatApp").controller("galleryController", galleryController);




