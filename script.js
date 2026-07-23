// VARIABLES

const backspace = document.querySelector(".backspace");
const deleteAll = document.querySelector(".clearAll");

const calcDisplay = document.querySelector("#calcDisplay");
const histDisplay = document.querySelector("#histDisplay");

const number = document.querySelectorAll(".number");
const dot = document.querySelector(".dot");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equal");

let deleteDelay;
let deleteInterval;
let errorTimer;

let firstNumber;
let currentNumber = "";
let newNumber;
let operator;
let secondNumber;

// DEBUGGER

//function updateDP() {
//    debugPanel.value = `${firstNumber} ${operator} ${secondNumber} ${newNumber}  ${currentNumber}`;
//};

//const debugPanel = document.querySelector(".debugPanel");


// FUNCTIONS

function deleteCharacter() {
    if (calcDisplay.value === "") {
        resetCalcState();
    }    

    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1);
    } else if (operator !== "") {
        operator = operator.slice(0, -1);
    } else {
        firstNumber = firstNumber.slice(0, -1);
    }
    calcDisplay.value = calcDisplay.value.slice(0, -1);
    histDisplay.value = histDisplay.value.slice(0, 0);
};

function stopDeleting() {
    clearTimeout(deleteDelay);
    clearInterval(deleteInterval);
};

function resetCalcState() {
    calcDisplay.value = calcDisplay.value.slice(0, 0);
    histDisplay.value = histDisplay.value.slice(0, 0);
    firstNumber = "";
    operator = "";
    currentNumber = "";
    newNumber = true;
};

function showError(message) {
    calcDisplay.value = message;

    clearTimeout(errorTimer);

    errorTimer = setTimeout(function () {
        calcDisplay.value = "";
    }, 1000);
};

// BACKSPACE AND DELETE ALL BUTTONS

backspace.addEventListener("mousedown", function () {
    deleteCharacter();
    deleteDelay = setTimeout(function () {
        deleteInterval = setInterval(function () {
            deleteCharacter();
        }, 75);
    }, 300);
});

["mouseup", "mouseleave"].forEach(function (event)
{
    backspace.addEventListener(event,
stopDeleting);
});

deleteAll.addEventListener("click", function () {
    resetCalcState();
})



// NUMBER AND OPERATOR BUTTONS

number.forEach(function (button) {
    button.addEventListener("click", function () {
        
        if (newNumber) {
            currentNumber = "";
            calcDisplay.value = "";
            newNumber = false;
        }

        currentNumber += button.value;
        calcDisplay.value += button.value;
    });
});

dot.addEventListener("click", function (button) {
    if (!currentNumber.includes(".")) {
    currentNumber += dot.value;
    calcDisplay.value += dot.value;
    }
});

operators.forEach(function (button) {
    button.addEventListener("click", function () {
        newNumber = false;
        firstNumber = Number(currentNumber);
        operator = button.value;

        let lastChar = calcDisplay.value.slice(-1);

        if (lastChar === "+" || lastChar === "*" || lastChar === "/" || lastChar === "") {
            return;
        }

        currentNumber = "";
        calcDisplay.value += button.dataset.operator;
    });
});

// 1+1=2 Hmmmm depende kung 3 yan, kasi kung 3 edi 5, SYEMPRE
// MATHEMATHICS

equals.addEventListener("click", function () {

    if (!newNumber) {
        secondNumber = Number(currentNumber);
    }

    let answer;

    if (operator === "+") {
        answer = firstNumber + secondNumber;
    } else if (operator === "-") {
        answer = firstNumber - secondNumber;
    } else if (operator === "*") {
        answer = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (firstNumber !== undefined && operator !== undefined && secondNumber === 0) {
                showError("Cannot divide by zero!");
                return;
            }
        answer = firstNumber / secondNumber;
    } else if (calcDisplay.value === "") {
        showError("Nothing to calculate!");
    } else {
        showError("Unknown operator!"); 
    } 


    if (answer % 1 !== 0) {
    answer = Number(answer.toFixed(5));
    }

    calcDisplay.value = answer;
    histDisplay.value = `${operator} ${secondNumber}`;

    firstNumber = answer;
    currentNumber = answer.toString();
    newNumber = true;
});

// CONDITIONS












