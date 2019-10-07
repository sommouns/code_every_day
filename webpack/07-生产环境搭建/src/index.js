import { cube, test } from './math.js'

if (process.env.NODE_ENV !== 'production') {
  console.log("Looks like we are in development model")
}

function component() {
  var element = document.createElement('div');

  element.innerHTML = [
    'Hello webpack!', 
    '5 cubed is equal to ' + cube(5)
  ]
  return element;
} 

var element = component()
document.body.appendChild(element)
