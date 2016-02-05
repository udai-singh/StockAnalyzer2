'use strict';

angular.module('StockAnalyzerApp', ['ui.bootstrap'])

  .controller('MenuController', ['$scope', '$http', function($scope, $http){

    $http.get('json/tickers.json').then(function(response){
      $scope.ticker_names = [];
      console.log(response.data);
      // angular.forEach(data, function(value, key){
      //   $scope.ticker_names.push(value.tickr_name);
      // });
    });

    $scope.message = "Hello World!";
  }]);
