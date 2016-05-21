'use strict';

/**
 * @ngdoc function
 * @name gletscherelfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gletscherelfApp
 */
angular.module('gletscherelfApp', ['heatmap', 'ya.nouislider'])
  .controller('MainCtrl', ['$scope', '$heatmap', '$http', function($scope, $heatmap, $http) {

    $scope.gameData = {};

    function generateRandomData(len) {
      var max = 100;
      var min = 1;
      var maxX = 1400; //document.body.clientWidth;
      var maxY = 990; //document.body.clientHeight;
      var data = [];
      while (len--) {
        data.push({
          x: ((Math.random() * maxX) >> 0),
          y: ((Math.random() * maxY) >> 0),
          value: ((Math.random() * max + min) >> 0),
          radius: ((Math.random() * 50 + min) >> 0)
        });
      }
      return {
        max: max,
        min: min,
        data: data
      };
    }


    $scope.heatmapConfig = {
      blur: 0.9,
      opacity: 0.5
    };

    $scope.updateData = function() {
      $scope.heatmapData = generateRandomData(5400);
    };

    // slider initialisation ///////////////////////////////////////////////////////////////////////////

    // first, define legend values
    var goals = [12, 31, 88];
    var values = [0, 15, 30, 45, 60, 75, 90];
    var goalsAndValues = goals.concat(values);

    // distinguish between "normal" and "highlighted" legend  numbers (e.g. to show game events like goals)
    function preparePips(value) {
      var goalIndex = goals.indexOf(value);
      if (goalIndex !== -1) {
        return 1;
      } else {
        return 2;
      }
    }

    // then, create a range slider comprising 90 minutes using above legend values
    var that = this;
    that.options = {
      start: [0, 2],
      behaviour: 'drag',
      step: 1,
      connect: true,
      range: {
        'min': 0,
        'max': 90
      },
      format: wNumb({
        decimals: 2,
      }),
      pips: {
        mode: 'values',
        values: goalsAndValues,
        filter: preparePips
      }
    };

    // slider movements ///////////////////////////////////////////////////////////////////////////
    // if slider moves, only display a part of the game coordinates

    function getPartialGameData(from, to) {
      var partialGameData = {};
      partialGameData.max = $scope.gameData.max;
      partialGameData.min = $scope.gameData.min;
      partialGameData.data = $scope.gameData.data.slice(from * 60, to * 60);
      return partialGameData;
    }

    function updateDistanceAndSpeed(fromSecond, toSecond) {
      $scope.distancePeriod = $scope.gameData.data[toSecond].totalDistance - $scope.gameData.data[fromSecond].totalDistance;
      $scope.distanceTotal = $scope.gameData.data[toSecond].totalDistance;
      $scope.speedPeriod = $scope.distancePeriod / (toSecond - fromSecond) * 3.6;
      $scope.speedTotal = $scope.distanceTotal / toSecond * 3.6;

    }

    function updateHeatmap() {
      var fromMinute = that.options.start[0];
      var toMinute = that.options.start[1];
      $scope.heatmapData = getPartialGameData(fromMinute, toMinute);
      updateDistanceAndSpeed(fromMinute * 60, toMinute * 60);
    }

    that.events = {
      update: updateHeatmap.bind(undefined)
    };

    $scope.loadData = function (file) {
      $http.get('data/' + file)
        .then(function(result) {

          $scope.gameData = result.data.gameData;
          $scope.heatmapData = $scope.gameData;
          updateHeatmap();

        });
    };




    // to calculate current position
    // $scope.currentMinute = (that.options.start[0] + that.options.start[1]) / 2;

  }]);
