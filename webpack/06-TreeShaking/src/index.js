import { cube, test } from './math.js'

function component() {
  var element = document.createElement('pre');

  element.innerHTML = [
    'Hello webpack!', 
    '5 cubed is equal to ' + cube(5)
  ]
  test()

  return element;
}

let element = component()
document.body.appendChild(element)
