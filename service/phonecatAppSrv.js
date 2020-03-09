"use strict";
/*global angular:true*/
/*global firebase:true*/

var phonecatAppSrv = function ($q) {
    let progressFile = 0;
    let listGallery = [];
    var responsephonecatAppSrv = {
        getGalleries: () => listGallery,
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
        saveUrl: (imageUrl) => {
            return $q((resolve, reject) => {
                responsephonecatAppSrv.pushIdImage()
                    .then((data) => {
                        return responsephonecatAppSrv.setimage(data.key, imageUrl);
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
        loadGalleries: () => {
            return $q((resolve, reject) => {
                firebase.database().ref().child("gallery")
                    .once("value")
                    .then((events) => {
                        const data = events.val();
                        listGallery = [];
                        angular.forEach(data, (value, key) => {
                            listGallery.push({ url: value.url, idGallery: key });
                        });
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        deleteImage: (folder, name) => {
            return $q.all([
                mainRef.child(folder + "/" + name).delete(),
                firebase.storage().ref().child(folder + "/" + name).delete()
            ]);
        },
        pushIdImage: () => {
            return mainRef.child("gallery").push();
        },
        getUrlImage: (folder, name) => {
            var storageRef = firebase.storage().ref();
            var downloadTask = storageRef.child(folder + "/" + name);
            return downloadTask.getDownloadURL();
        },
        uploadFile: (file) => {
            return $q((resolve, reject) => {
                const storage = firebase.storage();
                const storageRef = storage.ref();
                const listener = storageRef.child('gallery/' + file.name).put(file);
                debugger;
                listener.on('state_changed', function (snapshot) {
                    progressFile = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }, function () {
                    reject();
                }, function () {
                    debugger;
                    progressFile = 0;
                    responsephonecatAppSrv.getUrlImage('gallery', file.name)
                        .then((url) => {
                            return responsephonecatAppSrv.saveUrl(url);
                        })
                        .then(() => {
                            resolve();
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            });
        },
    };
    return responsephonecatAppSrv;
};
phonecatAppSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("phonecatAppSrv", phonecatAppSrv);