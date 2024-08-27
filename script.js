// Selecciona el elemento de la pantalla de la calculadora
const display = document.getElementById('display');

// Variables para almacenar los valores actuales, el operador y el valor previo
let currentInput = '';
let operator = '';
let previousInput = '';

// Selecciona todos los botones de la calculadora
const buttons = document.querySelectorAll('.btn');

// Itera sobre cada botón y agrega un evento de clic
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Obtiene el valor del botón presionado
        const value = this.getAttribute('data-value');

        // Si el botón es 'C', reinicia la calculadora
        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.textContent = '0'; // Muestra '0' en la pantalla
        } 
        // Si el botón es '=', realiza el cálculo y muestra el resultado
        else if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                const result = calculate(previousInput, operator, currentInput);
                display.textContent = result;
                previousInput = result; // Actualiza previousInput con el resultado para cálculos adicionales
                currentInput = '';
                operator = '';
            }
        } 
        // Si el botón es un operador (+, -, *, /), almacena el operador y el valor previo
        else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                } else if (operator) {
                    previousInput = calculate(previousInput, operator, currentInput);
                }
                currentInput = '';
                operator = value;
            }
        } 
        // Si el botón es un número o un punto decimal, añade el valor al input actual
        else {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

// Función para realizar el cálculo básico entre dos números
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
            return b !== 0 ? a / b : 'Error'; // Maneja la división por cero
        default:
            return '';
    }
}
