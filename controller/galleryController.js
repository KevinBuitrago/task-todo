/*global angular:true*/

var galleryController = function (phonecatAppSrv) {
var vm = this;
vm.images = null;
$scope.change = function() {
    $scope.counter++;
    vm.uploadedFile = (element) => {
        console.log("fdfd", element);
        vm.$apply((dd) => {
            vm.files = element.files;
            console.log("vm.files,", vm.files);
        });
    }
    getImages =(()=>{
        phonecatAppSrv.getFileReader();
    })
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
    }
    console.log(vm);
};
galleryController.$inject = ["phonecatAppSrv"];
angular.module("phonecatApp").controller("galleryController",galleryController);