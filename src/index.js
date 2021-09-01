function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // Check paired brackets
    (function() {
        let openBracketCounter = 0;
        let closeBracketCounter = 0;
        expr.split('').forEach(token => {
            if(token === '(') {
                openBracketCounter++;
            }
            if(token === ')') {
                closeBracketCounter++;
            }            
        });
        if(openBracketCounter !== closeBracketCounter) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    })();

    // Transform input string into array without spaces and concat non single numbers
    function correctArray() {
        const exprArr = expr.split('');
        let numberValue = '';
        let resultingArray = [];
    
        exprArr.forEach(item => {
            if(item && item !== ' ') {
                if (!isNaN(item)) {
                    numberValue += item;
                }
                if (isNaN(item)) {
                    if (numberValue) {
                        resultingArray.push(numberValue);
                    }
                    resultingArray.push(item);
                    numberValue = '';
                }
            }
        });
        if (numberValue) {
            resultingArray.push(numberValue);
        }
        return resultingArray;
    }

    // Get correctArray and transform into Reverse Polish Notation string
    function sortingStation() {
        const arr = correctArray();

        const operationsPriority = {
                    '-': 1,
                    '+': 1,
                    '*': 2,
                    '/': 2,
                };

        let resultString = '';    
        let stack = [];    
        arr.forEach(token => {
            let stackPeak = stack[stack.length - 1];
            if(!isNaN(token)) {
                resultString += `${token} `;
                return;
            }
            if(token === '(') {
                stack.push(token);
                return;
            }
            if(token === ')') {
                while(stackPeak !== '(') {
                    resultString += `${stack.pop()} `;
                    stackPeak = stack[stack.length - 1];
                }
                stack.pop();
                return;
            }
            if(operationsPriority.hasOwnProperty(token)) {
                if(!stack.length) {
                    stack.push(token);
                    return;
                }
                while(operationsPriority[stackPeak] >= operationsPriority[token]) {
                    if(stackPeak === '(') {
                        break;
                    }
                    resultString += `${stack.pop()} `;
                    stackPeak = stack[stack.length - 1];
                }
                stack.push(token);
                return;
            }
        });

        while(stack.length) {
            resultString += `${stack.pop()} `;
        }

        return resultString.substring(0, resultString.length - 1);
    }    
    
    //Get RPN string and calculate result
    const calculateRPN = () => {
        const str = sortingStation();
    
        const operations = {
            '+': (x, y) => x + y,
            '-': (x, y) => x - y,
            '*': (x, y) => x * y,
            '/': (x, y) => x / y
        };

        // Check for division by zero 
        if(str.includes(' 0 /')) {
            throw new Error("TypeError: Division by zero.");
        }
    
        let stack = [];
        str.split(' ').forEach((token) => {
            if (token in operations) {
                let [y, x] = [stack.pop(), stack.pop()];
                stack.push(operations[token](x, y));
            } else {
                stack.push(parseFloat(token));
            }
        });
    
        return stack.pop();
    };

    return calculateRPN();
}

module.exports = {
    expressionCalculator
};