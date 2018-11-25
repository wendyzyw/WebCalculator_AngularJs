'use strict';

angular.module('CalculatorApp',[])
    .controller('CalculatorController', ['$scope', function($scope){
        $scope.expression = '';
        $scope.current_input = '';
        $scope.exp_json = {"num1": '', "num2": '', "op": ''};
        $scope.state = 0;

        $scope.gather_input = function(input){
            $scope.expression += input;
            if ($scope.state == 0){
                $scope.exp_json.num1 += input;
                $scope.current_input = $scope.exp_json.num1;
            } else {
                $scope.exp_json.num2 += input;
                $scope.current_input = $scope.exp_json.num2;
            }
        }

        $scope.set_op = function(input){
            $scope.expression += input;
            $scope.exp_json.op = input;
            //set state to 1
            $scope.state = 1
        }

        $scope.clear_input = function(){
            $scope.current_input = '';
            $scope.expression = '';
            $scope.exp_json = {"num1": '', "num2": '', "op": ''};
        }

        $scope.backspace = function(){
            $scope.current_input = $scope.current_input.substr(0, $scope.current_input.length-1);
            $scope.expression = $scope.expression.substr(0, $scope.expression.length-1);
        }

        $scope.evaluate = function(){
            //evaluate the current mathematical expression based on the expression
            var result = eval_exp_json($scope.exp_json);
            $scope.current_input = result;
            $scope.expression += ' = ' + result + ' ';
            $scope.evaluated = true;
            $scope.exp_json = {"num1": '', "num2": '', "op": ''};
            $scope.state = 0;
        }

        var eval_exp_json = function(exp_json){
            var num1 = Number(exp_json.num1);
            var num2 = Number(exp_json.num2);
            var dec1 = precision(num1);
            var dec2 = precision(num2);
            var result;
            var result_dec = (dec1 > dec2)?dec1 : dec2;

            if (exp_json.op === '+'){
                result = (num1 + num2).toFixed(result_dec);
            } else if (exp_json.op === '-'){
                result = (num1 - num2).toFixed(result_dec);
            } else if (exp_json.op === '*'){
                result = num1 * num2;
            } else if (exp_json.op === '/'){
                result = num1 / num2;
            } else {
                result = '';
            }
            return result;
        }

        var precision = function(a) {
            var e = 1;
            while (Math.round(a * e) / e !== a) e *= 10;
            return Math.log(e) / Math.LN10;
        }
    }]);
