const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.textContent = '0';
        } else if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                const result = calculate(previousInput, operator, currentInput);
                display.textContent = result;
                previousInput = result; // Update previousInput with result for further calculations
                currentInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                } else if (operator) {
                    previousInput = calculate(previousInput, operator, currentInput);
                }
                currentInput = '';
                operator = value;
            }
        } else {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function calculate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'Error'; // Handle division by zero
        default:
            return '';
    }
}

