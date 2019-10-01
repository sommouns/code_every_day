// {
//   let proxy = new Proxy({}, {
//     get(target, property) {
//       return target[property] ? target[property] : 32
//     },
//     set(target, property) {
//       return target[property] = 21
//     }
//   })
//   console.log(proxy.name)
//   proxy.age = 20
//   console.log(proxy.age)
// }

// {
//   var target = {
//     _age: 12 // age is a sercret
//   }
//   var handler = {
//     get: function (target, key) {
//       if (key.startsWith('_')) {
//         console.log('this is a private var')
//         return false
//       }
//     },
//     set: function (target, key) {
//       if (key.startsWith('_')) {
//         console.log('this is a private var')
//         return false
//       }
//     }
//   }
//   let proxy = new Proxy(target, handler)
//   proxy._age = 12
// }

// {
//   var api = {  
//     _apiKey: '123abc456def',
//     getUsers: function(){ }, 
//     getUser: function(userId){ }, 
//     setUser: function(userId, config){ }
//   };

//   const RESTRICTED = ['_apiKey'];
//   api = new Proxy(api, {  
//       has(target, key) {
//           return (RESTRICTED.indexOf(key) > -1) ?
//               false :
//               Reflect.has(target, key);
//       }
//   });

//   // these log false, and `for in` iterators will ignore _apiKey
//   console.log("_apiKey" in api);
//   for (var key in api) { 
//       if (api.hasOwnProperty(key) && key === "_apiKey") {
//           console.log("This will never be logged because the proxy obscures _apiKey...")
//       }
//   }
// }

{
  function createValidator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let validator = this._validator[key]
          if (!!validator(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error('cannot set');
          }
        } else {
          throw Error('cannot set');
        }
      }
    })
  }
  const personValidator = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  class Person {  
    constructor(name, age) {
      this.name = name;
      this.age = age;
      return createValidator(this, personValidator);
    } 
  }   
  const bill = new Person('Bill', 25);

  // 以下操作都会报错
  bill.name = 0;  
  bill.age = 'Bill';  
  bill.age = 15;  
}