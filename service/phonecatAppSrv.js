/*global angular:true*/

var phonecatAppSrv = function($q) {
    var responsephonecatAppSrv = {
        getFileReader : function(file) {
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
        convertFileToBase64: function (file) {
            return $q((resolve, reject) => {
                var base64 = "";
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function (event) {
                    base64 = event.target.result;
                    if (base64) {
                        resolve(base64);
                    } else {
                        reject(false);
                    }
                };
            });
        },
    };
    return responsephonecatAppSrv;
};
phonecatAppSrv.$inject = ["$q"];
angular.module("phonecatApp").factory("phonecatAppSrv", phonecatAppSrv);