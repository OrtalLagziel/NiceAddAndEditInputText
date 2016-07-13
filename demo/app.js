var app = angular.module('App', [
  'myModule'
]);

app.controller('BaseCtrl', function($scope) {
  'use strict';

  $scope.myName = 'Scott';
});
