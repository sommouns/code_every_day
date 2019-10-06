# Scss 与 Sass 是什么,他们的区别在哪里？

## 什么是Sass?
Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。Sass 是采用 Ruby 语言编写的一款 CSS 预处理语言，它诞生于2007年，是最大的成熟的 CSS 预处理语言。最初它是为了配合HAML（一种缩进式 HTML 预编译器）而设计的，因此有着和 HTML 一样的缩进式风格。SASS是CSS3的一个扩展，增加了规则嵌套、变量、混合、选择器继承等等。通过使用命令行的工具或WEB框架插件把它转换成标准的、格式良好的CSS代码。

## 什么是Scss？
Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的**超集**，也就是说所有有效的CSS3样式也同样适合于Sass。说白了Scss就是Sass的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。另外，SCSS 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法，例如：古老的 IE filter 语法。

由于 Scss 是 CSS 的扩展，因此，所有在 CSS 中正常工作的代码也能在 Scss 中正常工作。也就是说，对于一个 Sass 用户，只需要理解 Sass 扩展部分如何工作的，就能完全理解 Scss。大部分扩展，例如变量、parent references 和 指令都是一致的；唯一不同的是，SCSS 需要使用分号和花括号而不是换行和缩进。

## Scss 与 Sass异同
Sass 和 Scss 其实就是同一种东西，我们平时都称之为 Sass，两者之间不同之处主要有以下两点：
1. 文件扩展名不同，Sass 是以`.sass`后缀为扩展名，而 Scss 是以`.scss`后缀为扩展名。
2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号(`{}`)和分号(`;`)，而 Scss 的语法书写和我们的CSS 语法书写方式非常类似。

```sass
#sidebar
width: 30%
background-color: #faa
```

```scss
#sidebar {
  width: 30%;
  background-color: #faa;
}
```