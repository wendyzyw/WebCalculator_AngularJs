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



});