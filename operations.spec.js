// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('CalculatorController', function() {
    var $rootScope, $scope, $controller, calculatorController;

    beforeEach(module('CalculatorApp'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        $controller = _$controller_;
        calculatorController = $controller('CalculatorController', {'$rootScope' : $rootScope, '$scope': $scope});
    }));

    it('controller exist', function() {
        expect(calculatorController).toBeDefined();
    });

    describe('$scope.evaluate', function(){
        it('handle float point arithmetic properly', function(){
            $scope.exp_json.num1 = '0.1';
            $scope.exp_json.op = '+';
            $scope.exp_json.num2 = '0.2';
            $scope.evaluate();
            expect($scope.result).toEqual('0.3');
        });

        it('handle unary operation properly', function(){
            $scope.exp_json.op = '√';
            $scope.exp_json.num2 = '9.0';
            $scope.evaluate();
            expect($scope.result).toEqual(3);
        });
    });

    describe('$scope.set_op', function(){
        it('cannot add another operation if one operation is already entered', function(){
            $scope.exp_json.op = '+';
            $scope.set_op('-');
            expect($scope.exp_json.op).toEqual('+');
        });

        it('cannot start with entering any binary operation without first given a number', function(){
           $scope.evaluated = true;
           $scope.exp_json.op = '√';
           $scope.set_op('+');
           expect($scope.exp_json.op).toEqual('√');
        });
    });

    describe('$scope.gather_input', function(){
        it('cannot type two consecutive . sign if one . has already been entered in one number', function(){
            $scope.state = 0;
            $scope.evaluated = false;
            $scope.exp_json.num1 = '1.';
            $scope.gather_input('.');
            expect($scope.exp_json.num1).toEqual('1.');
        });
    });

});