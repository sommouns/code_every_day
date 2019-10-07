async function getComponent() {

  var element = document.createElement('div')
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')
  element.innerHTML = _.join(['hellow', 'werbpack'], ' ')
  return element
}

getComponent().then(component => {
  document.body.appendChild(component)
})