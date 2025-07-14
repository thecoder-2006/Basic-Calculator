let display = document.querySelector('.display');
let expression = '';

function appendToDisplay(value) {
    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
    expression += value;
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
    display.textContent = '0';
    expression = '';
}

function backspace() {
    expression = expression.slice(0, -1);
    display.textContent = expression || '0';
    display.scrollLeft = display.scrollWidth;
}

function calculate() {
    try {
        let result = eval(expression.replace('×', '*').replace('÷', '/'));
        if (isNaN(result) || !isFinite(result)) {
            display.textContent = 'Error';
            expression = '';
        } else {
            display.textContent = result;
            expression = result.toString();
        }
    } catch (e) {
        display.textContent = 'Error';
        expression = '';
    }
    display.scrollLeft = display.scrollWidth;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    }
});