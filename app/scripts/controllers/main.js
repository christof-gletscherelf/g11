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
      }
    }

    $http.get('data/chrischi.json')
      .then(function(result) {

        $scope.gameData = result.data.gameData;
        $scope.heatmapData = $scope.gameData;

      });


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
      start: [0, 15],
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

    function getPartialGameData(from, to) {
      var partialGameData = {};
      partialGameData.max = $scope.gameData.max;
      partialGameData.min = $scope.gameData.min;
      partialGameData.data = $scope.gameData.data.slice(from * 60, to * 60);
      return partialGameData;
    }


    function updateHeatmap() {
      var fromMinute = that.options.start[0];
      var toMinute = that.options.start[1];
      $scope.heatmapData = getPartialGameData(fromMinute, toMinute);
    }

    that.events = {
      update: updateHeatmap.bind(undefined)
    };

    // to calculate current position
    $scope.currentMinute = (that.options.start[0] + that.options.start[1]) / 2;


    // slider movements ///////////////////////////////////////////////////////////////////////////
    // if slider moves, only display a part of the game coordinates

    // var fromMinute = document.getElementById('fromMinute');
    // var toMinute = document.getElementById('toMinute');






  }]);

// // random heatmap data /////////////////////////////////////////////////////////////////////////////
// //var img = document.getElementById('footballfield');
// var img = angular.element( document.querySelector( '#footballfield' ) );
// var fieldWidth = img.clientWidth;
// var fieldHeight = img.clientHeight;

//
// // data for the whole game
// // randomized coordinates
// function deviateCoordinateFromLen(len, max) {
//   var random = Math.random();
//   var linearPart = (5400 - len);
//   var randomPart = max * random;
//   var quota = len / max;
//   var normalizedLinearPart = linearPart / quota / 2;
//   var normalizedRandomPart = randomPart / quota / 2;
//   var result = (normalizedLinearPart * 0.8) + (normalizedRandomPart * 0.2);
//   return result >> 0;
// }
//
// function generateWholeGameData(len) {
//   var max = 1;
//   var min = 1;
//   var maxX = fieldWidth;
//   var maxY = fieldHeight;
//   var data = [];
//   while (len--) {
//     data.push({
//       x: deviateCoordinateFromLen(len, maxX),
//       y: deviateCoordinateFromLen(len, maxY),
//       value: 1
//     });
//   }
//   return {
//     max: max,
//     min: min,
//     data: data
//   };
// }
//
//
//
// //text field inputs //////////////////////////////////////////////////////////////////////////
// function updateFrom(value) {
//  dragSlider.noUiSlider.set([value, null]);
// }
//
// function updateTo(value) {
//   dragSlider.noUiSlider.set([null, value]);
// }
//
// // heatmap initialisation /////////////////////////////////////////////////////////////////////////
// // instantiate heatmap
// var myContainer = angular.element( document.querySelector( '#heatmapContainer' ) );
//
// var heatmap = h337.create({
//   container: myContainer,
//   maxOpacity: 0.5,
//   radius: 20,
//   blur: 1.0,
// });
//
//
//
//
// var wholeGameCoordinates = [];
// wholeGameCoordinates = generateWholeGameData(5400);
//
//
//





//
//
//
// var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wholeGameCoordinates));
// var dlAnchorElem = document.getElementById('downloadAnchorElem');
// dlAnchorElem.setAttribute("href", dataStr);
// dlAnchorElem.setAttribute("download", "sample.json");

//});
