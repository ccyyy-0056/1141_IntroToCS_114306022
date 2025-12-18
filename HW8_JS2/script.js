document.getElementById("calcBtn").addEventListener("click", calculate);

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
    if (b === 0) {
        return "Error: division by zero";
    }
    return a / b;
}

function calculate() {
    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);
    const op = document.getElementById("operator").value;

    let result;

    if (isNaN(num1) || isNaN(num2)) {
        result = "Invalid input";
    } else {
        switch (op) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
                result = multiply(num1, num2);
                break;
            case "/":
                result = divide(num1, num2);
                break;
        }
    }

    if (typeof result === "number") {
        result = result.toFixed(2);
    }

    document.getElementById("result").innerText = "Result = " + result;
}
