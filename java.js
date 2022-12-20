const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculatorKeys')
const display = calculator.querySelector('.calculatorDisplay')
var firstNumber = null // placeholder for Firstnumber
var operator = null // placeholder for the operator
var previousKeyType = null // placeholder for recognition of shit pressed

keys.addEventListener('click', event=> {

//let you click a calculator key
  const key = event.target
//recognizes value of key value pressed
  const keyValue = key.textContent
//updates display
  const displayValue = display.textContent
//defines the "type" of key you're pressing
  const type = key.getAttribute('data-type')

  if (type === 'number'){ //if the button clicked is a number
    if (displayValue === '0') {
      display.textContent = keyValue
    } else if (previousKeyType === 'operator') {
      display.textContent = keyValue
    }
    else {
      display.textContent = displayValue + keyValue
    }

  }
  else if (type === 'operator') { //if the button clicked is an operator
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
    operatorKeys.forEach(el => { el.dataset.state = ''})
    
    key.dataset.state = 'clicked'

    if (firstNumber === null) {
      firstNumber = parseFloat(displayValue)
    } 
    else { 
      firstNumber = calculate (firstNumber, operator, parseFloat(displayValue))
      display.textContent = firstNumber
    }
    operator = key.dataset.key
   
  }
  else if (type === 'equal') { //if the = button is clicked
    const secondNumber = parseFloat(displayValue)
    display.textContent = calculate (firstNumber, operator, secondNumber) 
  }   
  else if (type === 'clear') { //if the button is clear
    clearshit()
  }
  previousKeyType = type

})

function calculate (num1,op1,num2){ //calculate function for the number stored and the number displayed
  let result = '' 
  if (op1 === 'addition') result = num1 + num2
  if (op1 === 'divide') result = num1 / num2
  if (op1 === 'subtraction') result = num1 - num2
  if (op1 === 'multiply') result = num1 * num2

  console.log(num1, op1, num2, result)
  return result
  
}

function clearshit () { //function to clear everything
  firstNumber = null
  operator = null
  display.textContent = '0'
}
