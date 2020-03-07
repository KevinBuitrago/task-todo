/*global firebase:true*/

angular.module("phonecatApp").directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function () {
              $parse(attrs.fileModel)
              .assign(scope, element[0].files[0])
              scope.$apply();
            })
          }
    };
}]);