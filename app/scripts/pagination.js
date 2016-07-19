'use strict';

var StockAnalyzerApp = angular.module('StockAnalyzerApp',['angularUtils.directives.dirPagination']);

  StockAnalyzerApp.controller('PaginationController', function($scope, $http){

  // To demonstrate the log service
  //  log.log("Hello");
  //  log.info
  //  log.warn
  //  log.debug
  //  log.error

    $scope.message = "Hello World!";

    $http.get("http://www.w3schools.com/angular/customers.php")
      .then(function (response) {
        $scope.names = response.data.records;
      });

  });
