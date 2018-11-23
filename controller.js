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
    }]);
