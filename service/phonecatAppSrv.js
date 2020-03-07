"use strict";
/*global angular:true*/
/*global firebase:true*/

var phonecatAppSrv = function ($q) {
    var responsephonecatAppSrv = {
        getFileReader: (file) => {
            return $q((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = ((event) => {
                    resolve(event.target.result);
                });
                reader.onerror = ((event) => {
                    reject(event);
                });
                reader.readAsDataURL(file);
            });
        },
        saveImageBase64: (name, base64, folder) => {
            return $q((resolve, reject) => {
                const imageUrl = null;
                const idPush = responsephonecatAppSrv.pushIdImage();
                responsephonecatAppSrv.uploadImageBase64(base64, name, folder)
                    .then((url) => {
                        imageUrl = url;
                        return responsephonecatAppSrv.setimage(idPush, imageUrl);
                    })
                    .then(() => {
                        resolve(imageUrl)
                    })
                    .catch((error) => reject(error));
            });
        },
        convertFileToBase64: (file) => {
            return $q((resolve, reject) => {
                var base64 = "";
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (event) => {
                    base64 = event.target.result;
                    if (base64) {
                        resolve(base64);
                    } else {
                        reject(false);
                    }
                };
            });
        },
        setimage: (idImagea, setImage) => {
            return $q((resolve, reject) => {
                mainRef.child("gallery/" + idImagea + "/url").set(setImage)
                    .then(() => resolve(true))
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        uploadImageBase64: (base64, name, folder) => {
            return $q((resolve) => {
                var storage = firebase.storage();
                var storageRef = storage.ref();
                var uploadTask = storageRef.child(folder + "/" + name).putString(base64, "data_url");
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, null,
                    () => {
                        resolve(uploadTask.snapshot.downloadURL);
                    });
            });
        },
        downloadImage: (folder, name) => {
            return $q((resolve, reject) => {
                var storageRef = firebase.storage().ref();
                var downloadTask = storageRef.child(folder + "/" + name);
                downloadTask.getDownloadURL().then((url) => resolve(url))
                    .catch((error) => reject(error));
            });
        },
        deleteImage: (folder, name) => {
            return firebase.storage().ref().child(folder + "/" + name).delete();
        },
        pushIdImage: (folder, name) => {
            return firebase.storage().ref().child("gallery/" + idImagea + "/url").push();
        }
    };
    return responsephonecatAppSrv;
};
phonecatAppSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("phonecatAppSrv", phonecatAppSrv);