# 浅谈BFC和IFC

先说说FC，FC的含义就是Fomatting Context。它是CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。BFC和IFC都是常见的FC。分别叫做Block Fomatting Context 和Inline Formatting Context。

## BFC
BFC（Block Formatting Context）叫做“块级格式化上下文”。BFC的布局规则如下：
+ 内部的盒子会在垂直方向，一个个地放置
+ 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠
+ 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；
+ BFC的区域不会与float重叠；
+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此
+ 计算BFC的高度时，浮动元素也参与计算

介绍过了BFC的布局规范，再来说说哪些元素会产生BFC。
1. 根元素；
2. float的属性不为none；
3. position为absolute或fixed；
4. display为inline-block，table-cell，table-caption，flex；
5. overflow不为visible

```html
<div class="aside"></div>
<div class="main"></div>

div {
  width:300px;
}
.aside {
  width: 100px;
  height: 150px;
  float: left;
  background: black;
}
.main {
  height:200px;
  background-color:red;
}
```

这正满足了规范的第三条：

每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此。
所以如果我们需要将黑色区域撑到红色的左边，就需要利用规范的第四条：
BFC的区域不会与float重叠。

也就是说我们需要创造BFC区域,我们通过将红色区域的overflow设为hidden来触发BFC：
```css
.main {
  overflow:hidden;
  height:200px;
  background-color:red;
}
```

---

### IFC
IFC（inline Formatting Context）叫做“行级格式化上下”
布局规则如下：
1. 内部的盒子会在水平方向，一个个地放置；
2. IFC的高度，由里面最高盒子的高度决定；
3. 当一行不够放置的时候会自动切换到下一行；