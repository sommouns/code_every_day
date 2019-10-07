document.write(new Date())
console.log(navigator)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('load')
    navigator.serviceWorker.register('./service-worker.js').then(registeration => {
      console.log('SW registered ' + registeration)
    }).catch(registerationError => {
      console.log('SW registeration failded ' + registerationError)
    })
  })
}