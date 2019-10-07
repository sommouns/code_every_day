
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(json => {
    console.log('We retrived some data')
    console.log(json)
  })
    .catch(error => console.error('something goes wrong', error))