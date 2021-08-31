// function eval() {
//     // Do not use eval!!!
//     return;
// }

// const { sort } = require("semver");

// function expressionCalculator(expr) {
//     (function() {
//         let openBracketCounter = 0;
//         let closeBracketCounter = 0;
//         expr.split('').forEach(token => {
//             if(token === '(') {
//                 openBracketCounter++;
//             }
//             if(token === ')') {
//                 closeBracketCounter++;
//             }
//             if(openBracketCounter !== closeBracketCounter) {
//                 throw new Error("ExpressionError: Brackets must be paired");
//             }
//         });
//     })();

//     function correctArray() {
//         const exprArr = expr.split('');
//         let num = '';
//         let resultingArray = [];
    
//         exprArr.forEach(item => {
//             if(item && item !== ' ') {
//                 if (!isNaN(item)) {
//                     num += item;
//                 }
//                 if (isNaN(item)) {
//                     if (num) {
//                         resultingArray.push(num);
//                     }
//                     resultingArray.push(item);
//                     num = '';
//                 }
//             }
//         });
//         if (num) {
//             resultingArray.push(num);
//         }
//         return resultingArray;
//     }

//     function sortingStation() {
//         const arr = correctArray();
//         const operationsPriority = {
//                     '-': 1,
//                     '+': 1,
//                     '*': 2,
//                     '/': 2,
//                 };
    
//         let res = '';
//         let stack = [];
//         arr.forEach(item => {
//             if(item !== ' ') {
//                 const stackPeak = stack[stack.length - 1];
//                 if(!isNaN(item)) {
//                     res += `${item} `;
//                 } else if(!stack.length) {
//                     stack.push(item);
//                 } else if(operationsPriority[stackPeak] === operationsPriority[item]) {
//                     res += `${stack.pop()} `;
//                     stack.push(item);
//                 } else if(operationsPriority[stackPeak] > operationsPriority[item]) {
//                     res += `${stack.pop()} `;
//                     res += `${item} `;
//                 }
//                 else {
//                     stack.push(item);
//                 }
//             }
//         });
//         stack = stack.filter(token => token !== '(' && token !== ')');
//         while(stack.length) {
//             res += `${stack.pop()} `;
//         }
//         return res;
//     }

//     const operators = {
//         '+': (x, y) => x + y,
//         '-': (x, y) => x - y,
//         '*': (x, y) => x * y,
//         '/': (x, y) => x / y
//     };
    
//     const reversePolishNotationCalc = () => {
//         const str = sortingStation();
//         if(str.includes(' 0 / ')) {
//             throw new Error("TypeError: Division by zero.");
//         }
//         let stack = [];
//         str.split(' ').forEach((token) => {
//             if (token in operators) {
//                 let [y, x] = [stack.pop(), stack.pop()];
//                 stack.push(operators[token](x, y));
//             } else {
//                 stack.push(parseFloat(token));
//             }
//         });
//         console.log(stack);

//         return stack[0];
//     };
//     return reversePolishNotationCalc();
// }

// module.exports = {
//     expressionCalculator
// }

function correctArray(expr) {
    const exprArr = expr.split('');
    let num = '';
    let resultingArray = [];

    exprArr.forEach(item => {
        if(item && item !== ' ') {
            if (!isNaN(item)) {
                num += item;
            }
            if (isNaN(item)) {
                if (num) {
                    resultingArray.push(num);
                }
                resultingArray.push(item);
                num = '';
            }
        }
    });
    if (num) {
        resultingArray.push(num);
    }
    return resultingArray;
}
// 20, 57, 12, *, -, 58, 84, 32, *, 27, /, + -

function sortingStation() {
    const arr = correctArray("20 - 57 * 12 - (  58 + 84 * 32 / 27  )");
    // console.log(arr);
    const operationsPriority = {
                '-': 1,
                '+': 1,
                '*': 2,
                '/': 2,
                '(': 3,
                ')': 3
            };

    let res = '';
    let stack = [];
    arr.forEach(item => {
        if(item !== ' ') {
            const stackPeak = stack[stack.length - 1];
            if(!isNaN(item)) {
                res += `${item} `;
            } else if(!stack.length) {
                stack.push(item);
            } else if(operationsPriority[item] > operationsPriority[stackPeak]) {                
                stack.push(item);
            } else if(operationsPriority[item] <= operationsPriority[stackPeak]) {
                stack.push(item);
            }
        }
        // console.log(stack);
    });
    stack = stack.filter(token => token !== '(' && token !== ')');
    while(stack.length) {
        res += `${stack.pop()} `;
    }
    return res;
}

console.log(sortingStation());

// const operators = {
//     '+': (x, y) => x + y,
//     '-': (x, y) => x - y,
//     '*': (x, y) => x * y,
//     '/': (x, y) => x / y
// };

// const reversePolishNotationCalc = () => {
//     const str = sortingStation();
//     if(str.includes(' 0 / ')) {
//         throw new Error("TypeError: Division by zero.");
//     }
//     let stack = [];
//     str.split(' ').forEach((token) => {
//         if (token in operators) {
//             let [y, x] = [stack.pop(), stack.pop()];
//             stack.push(operators[token](x, y));
//         } else {
//             stack.push(parseFloat(token));
//         }
//     });
//     console.log(stack);

//     return stack[0];
// };
// // return reversePolishNotationCalc();

// console.log(reversePolishNotationCalc());

// 20, 57, 12, *, -, 58, 84, 32, *, 27, /, +