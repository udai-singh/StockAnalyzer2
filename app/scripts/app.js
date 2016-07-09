'use strict';

var StockAnalyzerApp = angular.module('StockAnalyzerApp', ['ui.bootstrap']);

  StockAnalyzerApp.controller('MenuController', function($scope, $http){

  // To demonstrate the log service
  //  log.log("Hello");
  //  log.info
  //  log.warn
  //  log.debug
  //  log.error

    $scope.message = "Hello World!";
    $scope.selected = undefined;
    $scope.ticker_names = [];

    $scope.result = [];

    var ticker;
    var ticker_name;
    var ticker_symbol;

    var last_trade_price;

    $http.get('app/json/tickers.json').then(function(response){

      angular.forEach(response.data.records, function(value, key){
        $scope.ticker_names.push(value.tickr_name);
      });
    });

    $scope.submit = function(){
      if($scope.selected === '' || $scope.selected === undefined){
          alert("please enter value..");
          return;
      };

      ticker = $scope.selected.split(',', 2);
      ticker_name = ticker[0];
      ticker_symbol = ticker[1];

      $scope.selected = '';

      var url = "http://query.yahooapis.com/v1/public/yql?q=";
      var uriComponent = "select * from yahoo.finance.quotes where symbol in ('" + ticker_symbol + "')";
      var data = encodeURIComponent(uriComponent);
      var end = "&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
      var jsoncallback = "&callback=JSON_CALLBACK";

      var final_url = url + data + end ;

      $http.get(final_url).then(function(response){
      //  console.log(response);
        last_trade_price = response.data.query.results.quote.LastTradePriceOnly;
        $scope.result.unshift({
          "Ticker" : ticker_name,
          "Last_Trade_Price" : last_trade_price
        });
        console.log($scope.result);
      }, function(error){
        alert("Error occurred");
        console.log(error);
      });
    };

  });
