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

    switch (exp_json.op){
        case '+':
            result = (num1 + num2).toFixed(result_dec); break;
        case '-':
            result = (num1 - num2).toFixed(result_dec); break;
        case '*':
            result = (num1 * num2).toFixed(dec1+dec2); break;
        case '/':
            result = num1 / num2; break;
        case '^':
            result = Math.pow(num1, num2); break;
        case '√':
            result = Math.sqrt(num2); break;
        default:
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