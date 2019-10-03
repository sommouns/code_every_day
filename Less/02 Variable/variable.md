# 变量

## 概览

比如颜色等样式，一串16进制数字，在css中被重复写很多次是见很常见的事情（比如主题色）

通过less，可以增强语义化，同时简化操作
```less
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}
```

---

## 用途

### 选择器
```less
// Variables
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```
编译后为
```less
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

### URLs
```less
// Variables
@images: "../img";

// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

### Imports
```less
// Variables
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

### 属性名
```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

### 定义变量名
```less
@fnord:  "I am fnord.";
@var:    "fnord";
content: @@var;
```

---

### 懒加载
下面这些都是有效的写法
```less
.lazy-eval {
  width: @var;
}

@var: @a;
@a: 9%;
```

```less
.lazy-eval-scope {
  width: @var;
  @a: 9%;
}

@var: @a;
@a: 100%;
```