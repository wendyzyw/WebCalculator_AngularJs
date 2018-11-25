'use strict';

const NUM1 = 0;
const OP = 1;
const NUM2 = 2;

angular.module('CalculatorApp',[])
    .controller('CalculatorController', ['$scope', function($scope){
        //keep track of the entire mathematical expression
        $scope.expression = '';
        //keep track of the current number/operation that user is entering
        $scope.current_input = '';
        //expression json object for mathematical evaluation
        $scope.exp_json = {"num1": '', "num2": '', "op": ''};

        //0: current_input starts recording num1; 1: record op; 2: record num2
        $scope.state = NUM1;
        $scope.evaluated = false;

        $scope.gather_input = function(input){
            if ($scope.evaluated){
                $scope.state = NUM1;
                $scope.evaluated = false;

                $scope.expression = '' + input;
                $scope.exp_json.num1 += input;
                $scope.current_input = $scope.exp_json.num1;
            } else {
                $scope.expression += input;

                if ($scope.state === NUM1){
                    $scope.exp_json.num1 += input;
                    $scope.current_input = $scope.exp_json.num1;
                } else if ($scope.state === NUM2) {
                    $scope.exp_json.num2 += input;
                    $scope.current_input = $scope.exp_json.num2;
                }
            }
        }

        $scope.set_op = function(input){
            $scope.expression += input;
            $scope.exp_json.op = input;
            $scope.current_input = $scope.exp_json.op;
            //set state to num2
            $scope.state = NUM2
        }

        $scope.clear_input = function(){
            $scope.expression = '';
            $scope.current_input = '';
            $scope.exp_json = {"num1": '', "num2": '', "op": ''};
        }

        $scope.backspace = function(){
            if (!$scope.evaluated){
                if ($scope.state === NUM1){
                    $scope.exp_json.num1 = remove_last_char($scope.exp_json.num1);
                } else if ($scope.state === OP){
                    $scope.exp_json.op = remove_last_char($scope.exp_json.op);
                } else {
                    $scope.exp_json.num2 = remove_last_char($scope.exp_json.num2);
                }
                $scope.current_input = remove_last_char($scope.current_input);
                $scope.expression = remove_last_char($scope.expression);
            } else {
                $scope.clear_input();
            }
        }

        $scope.evaluate = function(){
            //evaluate the current mathematical expression based on the expression
            var result = eval_exp_json($scope.exp_json);

            $scope.expression += ' = ' + result + ' ';
            $scope.exp_json = {"num1": '', "num2": '', "op": ''};
            $scope.current_input = result;

            $scope.evaluated = true;
            $scope.state = NUM1;
        }

        function remove_last_char(str){
            return str.substr(0, str.length-1);
        }

        // limit decimal places to handle javaScript float point precision problem
        // for +/- the number of decimal places of resulting number is the larger dec place of any input number
        // for * the number of decimal places of resulting number is the sum of dec place of both inputs
        // for / all decimal places leave
        function eval_exp_json(exp_json){
            var num1 = Number(exp_json.num1);
            var num2 = Number(exp_json.num2);
            var dec1 = precision(num1);
            var dec2 = precision(num2);
            console.log("dec1: "+dec1+"- dec2: "+dec2);
            var result;
            var result_dec = (dec1 > dec2)?dec1 : dec2;

            if (exp_json.op === '+'){
                result = (num1 + num2).toFixed(result_dec);
            } else if (exp_json.op === '-'){
                result = (num1 - num2).toFixed(result_dec);
            } else if (exp_json.op === '*'){
                result = (num1 * num2).toFixed(dec1+dec2);
            } else if (exp_json.op === '/'){
                result = num1 / num2;
            } else {
                result = '';
            }
            return result;
        }

        // a helper function to calculate number of decimal places given a float point number
        function precision(a) {
            if (!isFinite(a)) return 0;
            var e = 1, p = 0;
            while (Math.round(a * e) / e !== a) { e *= 10; p++; }
            return p;
        }
    }]);
