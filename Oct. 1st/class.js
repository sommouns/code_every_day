// 定义在class上的方法，默认都是绑定在prototype上的
{
  class Foo {
    constructor() {
      return Object.create(null);
    }
  }
   
  console.log(new Foo() instanceof Foo)
}
// Object.getPrototypeOf  来获取原型，部分浏览器不支持__proto__
{
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
   
  let inst = new MyClass();
   
  inst.prop = 123;
  // setter: 123
   
  inst.prop
  // 'getter'
}
{
  class A {
    
  }
}