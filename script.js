// Storing classes into usable variables
let addBtn = document.querySelector('.add');
let subtractBtn = document.querySelector('.subtract');
let multiplyBtn = document.querySelector('.multiply');
let divideBtn = document.querySelector('.divide');
let equalsBtn = document.querySelector('.equals');
let clearBtn = document.querySelector('.clear');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let buttons = document.querySelectorAll('button');
let deleteBtn = document.querySelector('.delete');
let decimalBtn = document.querySelector('.decimal');
let topDisplay = document.querySelector('.top');
let bottomDisplay = document.querySelector('.bottom');
let display = document.querySelector('.display');


// Calculation functions
function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    return a / b;
};

// Setting storage variables
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetScreen = false;


// Activating calculation functions based off the operator
function operate(operator, a, b) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}

// Sets initial bottom display text content
bottomDisplay.textContent = '';


// Updates the bottom display with digits
digits.forEach(button => {
    if (!button.classList.contains('decimal')) {
        button.addEventListener('click', () => {
            if (bottomDisplay.textContent === '0' || shouldResetScreen) {
                bottomDisplay.textContent = button.textContent;
                shouldResetScreen = false;
            } else {
                bottomDisplay.textContent += button.textContent;
            };
        });
    };
});

// Action whenever an operator is activated
operators.forEach(button => {
    button.addEventListener('click', () => {

        if (currentOperator !== null && !shouldResetScreen) {
            secondNumber = bottomDisplay.textContent;
            const a = parseFloat(firstNumber);
            const b = parseFloat(secondNumber);

            if(currentOperator === '/' && b === 0) {
                bottomDisplay.textContent = "Err: num / 0";
                firstNumber = null;
                currentOperator = null;
                return;
            }

            const result = operate(currentOperator, a, b);
            bottomDisplay.textContent = result;
            firstNumber = result;
        } else {
            firstNumber = bottomDisplay.textContent;
        };

        currentOperator = button.textContent;
        topDisplay.textContent = `${firstNumber} ${currentOperator}`;
        bottomDisplay.textContent = '';
        shouldResetScreen = true;
    });
});

// Maximum of 10 decimal places
function formatResult(num) {
    let rounded = Number(num.toFixed(10));
    return rounded.toString();
};

// Calculates the result
function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;

    secondNumber = bottomDisplay.textContent;
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);

    if (currentOperator === '/' && b === 0) {
        bottomDisplay.textContent = "Err: num / 0";
        topDisplay.textContent = '';
        return;
    };

    const result = operate(currentOperator, a, b);
    bottomDisplay.textContent = formatResult(result);
    topDisplay.textContent = `${a} ${currentOperator} ${b} = ${result}`;
    firstNumber = result;
    currentOperator = null;
    shouldResetScreen = true;
};

// Clear button
clearBtn.addEventListener('click', () => {
    bottomDisplay.textContent = '0';
    topDisplay.textContent = ''
    firstNumber = null;
    currentOperator = null;
    secondNumber = null;
    shouldResetScreen = false;
});

// Equals button
equalsBtn.addEventListener('click', () => {
    evaluate();
});

// Delete button
deleteBtn.addEventListener('click', () => {
    if (shouldResetScreen || bottomDisplay.textContent === 'Err: num / 0') {
        bottomDisplay.textContent = '0'
        shouldResetScreen = false;
        return;
    }

    bottomDisplay.textContent = bottomDisplay.textContent.slice(0,-1) || '0';
});

// Activates buttons based off keypresses
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        simulateButtonPress(e.key);
    };
    if (['+', '-', '*', '/'].includes(e.key)) {
        simulateButtonPress(e.key);
    };
    if (e.key === 'Enter' || e.key === '=') {
        equalsBtn.click();
    };
    if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteBtn.click();
    };
    if (e.key === 'Escape') {
        clearBtn.click();;
    }
    if (e.key === '.') {
        decimalBtn.click();
    };
});

// Activates buttons if the right value
function simulateButtonPress(value) {
    digits.forEach(button => {
        if (button.textContent === value) {
            button.click();
        }
    });
    
    operators.forEach(button => {
        if (button.textContent === value) {
            button.click();
        }
    });

    if (value === '=' || value === 'Enter') {
        equalsBtn.click();
    };
};

// Prevents multiple consecutive decimals
decimalBtn.addEventListener('click', () => {
    if (shouldResetScreen) {
        bottomDisplay.textContent = '0';
        shouldResetScreen = false;
        return;
    };

    if (!bottomDisplay.textContent.includes('.')) {
        bottomDisplay.textContent += '.';
    };
});