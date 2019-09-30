# Set和Map数据结构

## Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的

Set 本身是一个构造函数，用来生成 Set 数据结构。

```javascript
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i); //2,3,5,4
}
```
同时还可以利用set没有重复的值这一特性, 实现数组去重.(效率非常高))
```javascript
var arr = [1,1,2,2,3,3];
var s = new Set(arr);
s.size;//3
console.log([...s]);//1,2,3;

//Array.form方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const arr = Array.from(items);

//另一种数array组去重的方法
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3])
```

#### properties
+ Set.prototype.constructor：构造函数，默认就是Set函数。
+ Set.prototype.size：返回Set实例的成员总数。

#### methods
+ add(value)：添加某个值，返回Set结构本身。
+ delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
+ has(value)：返回一个布尔值，表示该值是否为Set的成员。
+ clear()：清除所有成员，没有返回值。

#### 遍历
+ keys()：返回键名的遍历器
+ values()：返回键值的遍历器
+ entries()：返回键值对的遍历器
+ forEach()：使用回调函数遍历每个成员

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。

---
# Map
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适
```javascript
var m = new Map([[{a:1}, 1], ["aa", 2]]);
console.log(m);
//Set和Map都可以用来生成新的 Map。

const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);//set形式
const m2 = new Map([['baz', 3]]);//二维数组形式
const m3 = new Map(m2);//map形式


// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');
console.log(map);//1=>bbb
```

#### properties
+ size 

#### methods
+ set(key, value)
+ get(key)
+ has(key)
+ delete(key)
+ clear()

参考文档：https://blog.csdn.net/c_kite/article/details/72819221