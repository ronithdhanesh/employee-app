const screen = document.querySelector('.screen')

const keys = document.querySelector('.keys')

//screen.value = "0";

const calculator = {
    displayValue : '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperator: false
}

function inputDigit(digit) {
    const displayValue = calculator.displayValue;
    if(calculator.waitingForSecondOperator === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperator = false;
    } else{
        if(displayValue === "0"){
            calculator.displayValue = digit
        } else {
            calculator.displayValue = displayValue + digit
        }
    }
}

function inputDecimal() {
    //const displayValue = calculator.displayValue;

    if(!calculator.displayValue.includes(".")){
        calculator.displayValue += "."
    }
}

function handleOperator(nextOperator){
    const inputValue = parseFloat(calculator.displayValue)

    calculator.firstOperand = inputValue;
    calculator.operator = nextOperator;
    calculator.waitingForSecondOperator = true;
    console.log(calculator);
    
}

function handleEqual(equalOperator) {
    const firstOperand = parseFloat(calculator.firstOperand);
    const secondOperand = parseFloat(calculator.displayValue);
    const operator = calculator.operator;


    if(operator === null || isNaN(firstOperand)){
        return;
    }

    let result;
    switch(operator){
        case "+" :
             result = firstOperand + secondOperand;
             break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "/":
            result = firstOperand / secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        
    }
    calculator.displayValue = String(result);
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperator = false;
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.operator = null;
}

function updateDisplay() {
    screen.value = calculator.displayValue;
}

updateDisplay();

keys.addEventListener('click', (event)=>{
    const target = event.target;

    if(!target.matches('button')){
        return;
    }


    if(target.classList.contains('operator')){
        //console.log('operator', target.value);
        handleOperator(target.value)
        return
    }
    // console.log(target.value);

    if(target.classList.contains('all-clear')){
        // console.log('all-clear', target.value);
        // return
        resetCalculator();
        updateDisplay();
        return;
    }
    
    if(target.classList.contains('decimal')){
        // console.log('decimal', target.value);
        // return;
        inputDecimal();
        updateDisplay();
        return;
    }

    if(target.classList.contains('equal-sign')){
        //console.log('equal-sign', target.value);
        handleEqual(target.value);
        updateDisplay()
        return;
    }

    else{
        inputDigit(target.value);
        updateDisplay();
    }
})