var a = {
  name: 'king',
  say: function (gender, school) {
    console.log('my name is ' + this.name + ' my gender is' + gender + ' my school is ' + school)
  }
}

var b = {
  name: 'kim',
}

a.say()
a.say.call(b, 'boy', 'zjnu')
a.say.apply(b, ['girl' , 'xz'])
a.say.bind(b, 'nan', 'zhanshenxueyuan')()
a.say.bind(b)('nan', 'zhanshenxueyuan')
