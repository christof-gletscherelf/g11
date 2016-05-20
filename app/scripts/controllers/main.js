'use strict';

/**
 * @ngdoc function
 * @name gletscherelfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gletscherelfApp
 */
angular.module('gletscherelfApp', ['heatmap'])
  .controller('MainCtrl', ['$scope', '$heatmap', function($scope, $heatmap) {
    //var dragSlider = document.getElementById('drag');

    function generateRandomData(len) {
      var max = 100;
      var min = 1;
      var maxX = 1000;//document.body.clientWidth;
      var maxY = 900;//document.body.clientHeight;
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
    };

    $scope.heatmapData = generateRandomData(1000);

    $scope.heatmapConfig = {
      blur: .9,
      opacity: .5
    };
    
    $scope.updateData = function() {
      $scope.heatmapData = generateRandomData(1000);
    };

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
// // function readGameDataFromFile(len) {
// //   var myData = JSON.parse(sampleReduced);
// //   return myData;
// // }
//
//
//
//
//
// slider initialisation ///////////////////////////////////////////////////////////////////////////

// first, define legend values
// var goals = [12, 31, 88];
// var values = [0, 15, 30, 45, 60, 75, 90];
// var goalsAndValues = goals.concat(values);
// // distinguish between "normal" and "highlighted" legend  numbers (e.g. to show game events like goals)
// function preparePips(value, type) {
//   var goalIndex = goals.indexOf(value);
//   if (goalIndex !== -1) {
//     return 1;
//   } else {
//     return 2;
//   }
// }
//
// // then, create a range slider comprising 90 minutes using above legend values
//
// noUiSlider.create(dragSlider, {
//   start: [0, 15],
//   behaviour: 'drag',
//   connect: true,
//   range: {
//     'min': 0,
//     'max': 90
//   },
//   format: wNumb({
//     decimals: 0,
//   }),
//   pips: {
//     mode: 'values',
//     values: goalsAndValues,
//     filter: preparePips
//   }
// });
//
//
//
// // slider movements ///////////////////////////////////////////////////////////////////////////
//
// // if slider moves, only display a part of the game coordinates
// var fromMinute = document.getElementById('fromMinute');
// var toMinute = document.getElementById('toMinute');
//
// function getPartialGameCoordinates(from, to) {
//   var partialGameCoordinates = {};
//   partialGameCoordinates.max = wholeGameCoordinates.max;
//   partialGameCoordinates.min = wholeGameCoordinates.min;
//   partialGameCoordinates.data = wholeGameCoordinates.data.slice(from * 60, to * 60);
//   return partialGameCoordinates;
// }
//
// dragSlider.noUiSlider.on('update', function(values, handle) {
//   fromMinute.value = values[0];
//   toMinute.value = values[1];
//   heatmap.setData(getPartialGameCoordinates(fromMinute.value, toMinute.value));
//   heatmap.repaint();
// });
//
//
//
// var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wholeGameCoordinates));
// var dlAnchorElem = document.getElementById('downloadAnchorElem');
// dlAnchorElem.setAttribute("href", dataStr);
// dlAnchorElem.setAttribute("download", "sample.json");

//});
