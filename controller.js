'use strict';

angular.module('CalculatorApp',[])
    .controller('CalculatorController', ['$scope', function($scope){
        $scope.usr_input = '';

        $scope.gather_input = function(input){
            $scope.usr_input += input;
        }

        $scope.clear_input = function(){
            $scope.usr_input = '';
        }

        $scope.backspace = function(){
            $scope.usr_input = $scope.usr_input.substr(0, $scope.usr_input.length-1);
        }

        $scope.evaluate = function(){
            //evaluate the current mathematical expression based on the usr_input
            var result = eval($scope.usr_input);
            console.log(result);
            $scope.usr_input = result;
        }
    }]);
