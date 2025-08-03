let addBtn = document.querySelector('.add')
let subtractBtn = document.querySelector('.subtract')
let multiplyBtn = document.querySelector('.multiply')
let divideBtn = document.querySelector('.divide')
let equalsBtn = document.querySelector('.equals')
let clearBtn = document.querySelector('.clear')
let digits = document.querySelectorAll('.digit')
let operators = document.querySelectorAll('.operator')
let buttons = document.querySelectorAll('button')

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetScreen = false;

function operate(operator, a, b) {
    if (operator === '+') return add(a, b)
    if (operator === '-') return subtract(a, b)
    if (operator === '*') return multiply(a, b)
    if (operator === '/') return divide(a, b)
}

let display = document.querySelector('.display')
display.textContent = '';

digits.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent === '0' || shouldResetScreen) {
            display.textContent = button.textContent;
            shouldResetScreen = false;
        } else {
            display.textContent += button.textContent;
        };
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator == null) { // If no current operator
            firstNumber = display.textContent // Stores first number
            currentOperator = button.textContent // Stores current operator
            shouldResetScreen = true; // Resets the screen
        } else {
            return; // Returns if already an operator
        }
    })
})

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;

    secondNumber = display.textContent
    const a = parseFloat(firstNumber)
    const b = parseFloat(secondNumber)

    const result = operate(currentOperator, a, b);
    display.textContent = result;
    currentOperator = null;


}

clearBtn.addEventListener('click', () => {
    display.textContent = '0'
    firstNumber = null
    currentOperator = null
    secondNumber = null
    shouldResetScreen = false
})

equalsBtn.addEventListener('click', () => {
    evaluate();
})

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        let color = getComputedStyle(btn).backgroundColor();
        let current = color.match(/\d+/g);
        if (!current) return
        let [r, g, b] = current.map(Number);
        r = Math.max(r - 25, 0);
        g = Math.max(g - 25, 0);
        b = Math.max(b - 25, 0);
        btn.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    })

    btn.addEventListener('mouseleave', () => {
    btn.style.backgroundColor = ''; // Resets to original CSS
    })
})