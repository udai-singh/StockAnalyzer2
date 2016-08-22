'use strict';

var StockAnalyzerApp = angular.module('StockAnalyzerApp', ['ui.bootstrap', 'angularUtils.directives.dirPagination']);

  StockAnalyzerApp.controller('MenuController', function($scope, $http){

  // To demonstrate the log service
  //  log.log("Hello");
  //  log.info
  //  log.warn
  //  log.debug
  //  log.error

    $scope.message = "Hello World!";
    $scope.show_summary = false;
    $scope.selected = undefined;
    $scope.ticker_names = [];

    $scope.result = [];

    /* color of the rows */
    $scope.color = "";



    var ticker;
    var ticker_name;
    var ticker_symbol;

    var last_trade_price;
    var symbol;
    var company;
    var change;
    var percent_change = [];

    $http.get('app/json/tickers.json').then(function(response){

      angular.forEach(response.data.records, function(value, key){
        $scope.ticker_names.push(value.tickr_name);
      });
    });

    $scope.submit = function(){
      //alert($scope.selected);
      $scope.show_summary = true;
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
        // console.log(response);
        last_trade_price = response.data.query.results.quote.LastTradePriceOnly;
        symbol = response.data.query.results.quote.Symbol;
        company = response.data.query.results.quote.Name;
        change = response.data.query.results.quote.Change_PercentChange;
        percent_change = change.split(" ");

        $scope.result.unshift({
          "Symbol" : symbol,
          "Company" : company,
          "Ticker" : ticker_name,
          "Last_Trade_Price" : last_trade_price,
          "Change" : percent_change[0],
          "Percent_Change" : percent_change[2]
        });
        // console.log($scope.result);
      }, function(error){
        alert("Error occurred");
    //    console.log(error);
      });
    };

    $scope.set_color = function (value) {

      if(value.toString().indexOf('-') === -1){
                return {
                color: "green"
                }
              } else{
                return {
                color: "red"
                }
              }
    }

  });
