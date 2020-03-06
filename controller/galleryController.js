/*global angular:true*/

var galleryController = function (phonecatAppSrv) {
var vm = this;
vm.images = null;
	const load = () => {
		
	}
	vm.onChange = function onChange(fileList) {
		console.log("fileList", fileList);
        fileToUpload = fileList[0];
    };
    vm.upload = function() {
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
        // }
    }
	load();
};
galleryController.$inject = ["phonecatAppSrv"];
angular.module("phonecatApp").controller("galleryController",galleryController);