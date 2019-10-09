function trim(string) {
  var trimReg = /^\s+|\s+$/g
  return string.replace(trimReg, '')
}
// console.log(trim(' 2 '))
function emailValidator(email) {
  var emailReg = /[\w-]+@([\w]+(\.[\w]{2,3}){1,2})$/
  return !!email.match(emailReg)
}

console.log(emailValidator('969728883@qqcom'))
