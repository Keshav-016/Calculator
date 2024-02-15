const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttonContainer');

function evaluate() {
    let input = display.value;
    let i = 0;
    let val = 0;
    let operator = "+";
    let input1 = "";
    while (i < input.length) {
        if (input[i] === "+" || input[i] === "-" || input[i] === "/" || input[i] === "*") {
            switch (operator) {
                case "+":
                    val += Number(input1);
                    break;
                case "-":
                    val -= Number(input1);
                    break;
                case "*":
                    val *= Number(input1);
                    break;
                case "/":
                    val /= Number(input1);
                    break;
                default:
                    console.log("wrong operation");
            }
            input1 = "";
            operator = input[i];
        }
        else {
            input1 += input[i];
        }
        i++;
    }
    switch (operator) {
        case "+":
            val += Number(input1);
            break;
        case "-":
            val -= Number(input1);
            break;
        case "*":
            val *= Number(input1);

            break;
        case "/":
            val /= Number(input1);
            break;
        default:
            console.log("wrong operation");
    }
    display.value = val.toString();

}

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== "BUTTON") {
        return;
    }
    else if (e.target.id === "allClear") {
        display.value = "";
        display.setAttribute("placeholder", "0");
    }
    else if (e.target.id === "clear") {
        if (display.value === "Infinity" || display.value==="NaN") {
            display.value = "";
        }
        else {
            display.value = display.value.slice(0, display.value.length - 1);
        }
    }
    else if (e.target.id === "equal") {
        if (display.value !== "")
            evaluate();
    }
    else if (e.target.id === "add") {
        evaluate();
        display.value += e.target.innerText;
    }
    else if (e.target.id === "subtract") {
        evaluate();
        display.value += e.target.innerText;
    }
    else if (e.target.id === "multiply") {
        evaluate();
        display.value += e.target.innerText;
    }
    else if (e.target.id === "divide") {
        evaluate();
        display.value += e.target.innerText;
    }
    else {
        display.value += e.target.innerText;
    }

})