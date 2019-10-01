// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  this.friends = ['dog', 'pig'];
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

function Cat(){
  Animal.apply(this, arguments);
}

function inheritPrototype(parent, son) {
  var protoType = Object.create(parent.prototype);
  protoType.constructor = son;
  son.prototype = protoType;
}

inheritPrototype(Animal, Cat);

// Test Code
var cat = new Cat('Tom');
console.log(cat.name); // Tom
cat.sleep(); // Tom正在睡觉！
cat.eat('老鼠'); // Tom正在吃：老鼠
cat.friends.push('chicken');
var cat1 = new Cat('Boo');
console.log(cat.friends); // ["dog", "pig", "chicken"]
console.log(cat1.friends); // ["dog", "pig"]
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true