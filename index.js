const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttonContainer');
let decimal = false;

function isOperator(value) {
    if (value === "+" || value === "-" || value === "/" || value === "*" || value === "^")
        return true
    return false
}
function precedence(op) {
    if (op === "+")
        return 0;
    else if (op === "-")
        return 1;
    else if (op === "*")
        return 2;
    else if (op === "/")
        return 3;
    else
        return 4;
}
function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return b - a;
        case "*":
            return a * b;
        case "/":
            return b / a;
        case "^":
            return Math.pow(b, a);;
    }
}

function evaluate() {
    let firstNegative = true;
    let numbers = [];
    let operators = [];
    for (let i = 0; i < display.value.length; i++) {
        let num = "";
        if (firstNegative) {
            firstNegative = false;
            if (display.value[0] === "-") {
                num += display.value[0];
                i++;
            }
        }
        if (!isOperator(display.value[i])) {
            while (i < display.value.length && !isOperator(display.value[i])) {
                num += display.value[i];
                i++;
            }
            i--;
            numbers.push(Number(num));
        }
        else {
            if (operators.length === 0)
                operators.push(display.value[i])
            else {
                let prevOperator = operators.pop();
                let currentOperator = display.value[i];
                if (precedence(currentOperator) > precedence(prevOperator)) {
                    operators.push(prevOperator, currentOperator);
                }
                else {
                    while (operators.length > 0 && precedence(currentOperator) < precedence(prevOperator)) {
                        let a = numbers.pop();
                        let b = numbers.pop();
                        numbers.push(calculate(a, b, prevOperator));
                        prevOperator = operators.pop();
                    }
                    if (operators.length === 0 && precedence(currentOperator) < precedence(prevOperator)) {
                        let a = numbers.pop();
                        let b = numbers.pop();
                        numbers.push(calculate(a, b, prevOperator));
                        operators.push(currentOperator);
                    }
                    else
                        operators.push(prevOperator, currentOperator);
                }
            }
        }
    }
    while (operators.length > 0) {
        let currentOperator = operators.pop();
        let a = numbers.pop();
        let b = numbers.pop();
        numbers.push(calculate(a, b, currentOperator));
    }
    display.value = numbers[0];
}

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== "BUTTON") {
        return;
    }
    else if (e.target.id === "allClear") {
        display.value = "";
        display.setAttribute("placeholder", "0");
        decimal = false;
    }
    else if (e.target.id === "clear") {
        if (display.value === "Infinity" || display.value === "NaN" || display.value === "undefined" || display.value === "-Infinity") {
            display.value = "";
        }
        else {
            let index = display.value.length - 1;
            if (display.value[index] === ".")
                decimal = false;
            display.value = display.value.slice(0, index);

        }
    }
    else if (e.target.id === "equal") {
        let index = display.value.length - 1;
        if (!isOperator(display.value[index]) && display.value.length > 1)
            evaluate();
    }

    else if (e.target.id === "decimal") {
        let index = display.value.length - 1;
        if (!decimal) {
            decimal = true;
            display.value += e.target.innerText;
        }
    }
    else if (e.target.id === "zero") {
        if (display.value.length > 0) {
            display.value += e.target.innerText;
        }
    }
    else if (isOperator(e.target.innerText)) {
        let index = display.value.length - 1;
        if (display.value[index] === ".") {
            return;
        }
        if (isOperator(display.value[index])) {
            display.value = display.value.slice(0, index);
        }
        if (display.value.length > 0) {
            display.value += e.target.innerText;
            decimal = false;
        }
        else if (e.target.innerText === "-" && display.value.length === 0) {
            display.value += e.target.innerText;
        }
    }
    else if (e.target.id === "squareRoot") {
        evaluate();
        let rootNumber = Number(display.value);
        display.value = Math.sqrt(rootNumber);
    }
    else {
        display.value += e.target.innerText;
    }
})