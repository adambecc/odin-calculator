//obtienen elementos del HTML que mostrarán la operación en curso y el resultado
const operationDisplay = document.getElementById("operation");
const resultDisplay = document.getElementById("result");
//selecciona los botones numericos y de operadores
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

//mantiene el numero que el usuario esta ingresando en ese momento
let currentInput = "";
//almacena el operador actual
let operator = "";
//almacena el primer numero que el usuario ha ingresado antes de presionar un operador
let firstOperand = null;

//recorre todos los botones numericos y agrega un eventListener a cada uno
//cuando el usuario hace click en un butun numerico, el numero se agrega a currentImput
//llama a updateDisplay para mostrar en pantalla el numero que el usuario va ingresado
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent;
        updateDisplay();
    });
});

//si se presiona el boton c llama a resetCalculator() para reiniciar
//si se presiona el boton = llama calculate() para realizar la operacion
//si se presiona cualquier otro operaodor y hay un valor en currentImput
    //la calculadora puede guardarlo como firstOperand si es la primera vez que se ingresa
    //si ya hay un firstOperand, llama a calculate para realizar la operacion pendiente

//luego almacena el operador seleccionado, lo muesrta en operationDisplay y limpia currentInput para que el usuario pueda ingresar el segundo numero
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "C") {
            resetCalculator();
        } else if (button.textContent === "=") {
            calculate();
        } else if (currentInput !== "") {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else {
                calculate();
            }
            operator = button.textContent;
            operationDisplay.textContent = `${firstOperand} ${operator}`;
            currentInput = "";
        }
    });
});

//realiza el calculo real
//si hay un firstOperand y el usuario ha ingresado un segundo numero, convierte el currentINput en secondOPerand
//Dependiendo del operador almacenado, realiza la operacion correspomndiente entre el firstOperand y el secondOperand
//el resultado se muestra en resultDisplay y el firstOperand se actualiza cone se resultado, permitiendo calculos ecadenados
//si el segundo numero es 0 en una division, muestra "Error" y se reinicia la calculadora
function calculate() {
    if (firstOperand !== null && currentInput !== "") {
        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "x":
                result = firstOperand * secondOperand;
                break;
            case "%":
                if (secondOperand === 0) {
                    resultDisplay.textContent = "Error";
                    resetCalculator();
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        resultDisplay.textContent = result;
        currentInput = "";
        firstOperand = result;
        operationDisplay.textContent = "";
    }
}

//reinicia todas las variables y limpia todas las pantallas
function resetCalculator() {
    currentInput = "";
    operator = "";
    firstOperand = null;
    operationDisplay.textContent = "";
    resultDisplay.textContent = "";
}

//muestra el numero actual en el elemento resultDisplay 
function updateDisplay() {
    resultDisplay.textContent = currentInput;
}