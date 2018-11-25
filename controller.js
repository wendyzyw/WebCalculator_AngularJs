'use strict';

const NUM1 = 0;
const OP = 1;
const NUM2 = 2;
const NUM_VALIDATOR = /^[0-9]+[.]?[0-9]*$/;

angular.module('CalculatorApp',[])
    .controller('CalculatorController', ['$scope', function($scope){
        // this array can be extended to include operations such as: trigonomitric, log, ln
        $scope.unary_ops = ['√'];

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
            if ($scope.evaluated) {
                $scope.state = NUM1;
                $scope.evaluated = false;

                $scope.expression = '' + input;
                $scope.exp_json.num1 += input;
                $scope.current_input = $scope.exp_json.num1;
            } else {
                if ($scope.state === NUM1) {
                    var num_to_test = $scope.exp_json.num1 + input;
                    if (number_validation(num_to_test)) {
                        $scope.exp_json.num1 = num_to_test;
                        $scope.expression += input;
                        $scope.current_input = $scope.exp_json.num1;
                    } else {
                        console.log("failed num validation for num1");
                    }
                } else if ($scope.state === NUM2) {
                    var num_to_test = $scope.exp_json.num2 + input;
                    if (number_validation(num_to_test)){
                        $scope.exp_json.num2 = num_to_test;
                        $scope.expression += input;
                        $scope.current_input = $scope.exp_json.num2;
                    }
                }
            }
        }

        $scope.set_op = function(input){
            if ($scope.exp_json.op === '') {
                if (!$scope.evaluated) {
                    if (input === '/') {
                        $scope.expression += '÷';
                    } else if (input === '*') {
                        $scope.expression += '×';
                    } else {
                        $scope.expression += input;
                    }
                    $scope.exp_json.op = input;
                    $scope.current_input = $scope.exp_json.op;
                    //set state to num2
                    $scope.state = NUM2

                } else if ($scope.evaluated && $scope.unary_ops.includes(input, 0)) {
                    $scope.evaluated = false;
                    $scope.expression = '' + input;
                    $scope.exp_json.op = input;
                    $scope.current_input = $scope.exp_json.op;
                    $scope.state = NUM2;
                }
            }
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
            if (!$scope.evaluated) {
                //evaluate the current mathematical expression based on the expression
                $scope.result = eval_exp_json($scope.exp_json);

                $scope.expression += ' = ' + $scope.result + ' ';
                $scope.exp_json = {"num1": '', "num2": '', "op": ''};
                $scope.current_input = $scope.result;

                $scope.evaluated = true;
                $scope.state = NUM1;
            }
        }

    }]);

    function remove_last_char(str){
        return str.substr(0, str.length-1);
    }

    function number_validation(num_str){
        return num_str === '' || NUM_VALIDATOR.test(String(num_str).toLowerCase());
    }


