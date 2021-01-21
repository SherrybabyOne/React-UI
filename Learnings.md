## 样式解决方案
- Inline CSS
  - 直接使用CSS类名比Inline CSS性能要优
- CSS in JS
- Styled Component
- Sass/Less


Sass  **!default**表示默认值，如果变量已经被赋值不会再被赋值，但如果变量还没有被赋值，则会被赋予新的值。

Sass文件以`_`开头，表示不用将其编译成css文件，只用于导入文件使用。

Sass和css都支持`@import`命令，两者有所区别：
1. CSS `@import`会进行额外的HTTP请求得到相应的文件
2. SASS `@import`会将所有文件连接为一个文件，只需要发送一个请求


Sass支持混合指令（Mixin Directives）

定义混合指令`@minxin`后添加名称与样式，也可以接收**参数**，参数也可以设置默认值.

引入混合指令使用`@include`，在其后添加混合名称，以及需要的参数.

暴露出一个`index.scss`文件，引用其它scss文件做到样式文件的分离：
```
// config
@import "variables";

// layout
@import "reboot";

// mixin
@import "mixin";

// button
@import "../components/Button/style";
```

在Sass当中使用变量，需要使用`#{}`包裹起来，代表一个占位符，在使用时会用变量的内容做对应的替换。

一个ReactCSS动画解决库：`react-transition-group`

### Sass Each
对于频繁的操作，`Sass`提出了`Each`的解决方案：
```css
// 首先定义一个含有key、val的map
$theme-colors: 
(
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);

// 进行遍历操作
// #代表占位，实际内容会被变量替换
@each $key, $val in $theme-colors {
  .icon-#{$key} {
    color: $val;;
  }
}

```

## Button组件
一个组件有自定制的属性，原生属性也要支持，某些组件还不同的扩展（比如Button组件，返回一个button或a标签）,此时怎样优雅地管理这些属性定义组件的Props类型就成了问题

组件Props接口类型：
```
// 自定义属性
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}
interface BaseButtonType {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// 使用交叉类型将多种类型合并，最后使用Partial把所有属性设置为可选
type NativeButtonProps = BaseButtonType & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonType & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
```
获取props时，非更改的props直接使用rest参数传递给返回的html元素即可。`

使用**classnames**进行类名的管理：
```
const classes = classnames('btn', className, {
  [`btn-${btnType}`]: btnType,
  [`btn-${size}`]: size,
  'disabled': (btnType === ButtonType.Link) && disabled,
});
```

根据ButtonType的不同类型返回不同的html元素：
```
if (btnType === ButtonType.Link && href) {
  return (
    <a
      className={classes}
      href={href}
      {...restProps}
    >{children}</a>
  )
} else {
  return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
    >{children}</button>
  )
}
```

## 测试
通用的测试工具最常用的是**jest**：
> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

React需要特殊的测试工具，把`React Component`渲染/挂载到测试用例上，新版本的`create-react-app`已经默认安装了**Testing Library**

```javascript
test('our first react test case', () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText('Nice');
  expect(element).toBeTruthy();
})
```

## 判断子组件的类型
React中判断子组件的类型进行条件渲染，使用**map**，会有问题：
```javascript
<div>{children.map(i => {
  return ... 
})}</div>
```
`children`是一个不透明的类型，在某些类型上调用**map**方法会报错。

`React.Children`提供了用于处理`this.props.children`不透明数据结构的实用方法：
```javascript
React.Children.map(children, function[(thisArg)]);
React.Children.forEach(children, function[(thisArg)]);
// 如果children是一个Fragment，会被视为单一节点的情况处理，而不会被遍历
// 如果children是undefined/null，则返回undefined/null,不会返回数组
```

另外可以通过`React.cloneElement`方法，以**element**元素为样板克隆并返回新的React元素。返回元素的`props`是将新的`props`与原始元素的`props`浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的`key`和`ref`将被保留：
```javascript
React.cloneElement(
  element,
  [props],
  [...children]
)
```

一个🌰：
```javascript
const renderChildren = () => {
  return React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<MenuItemProps>;
    // 在Menu上挂载的静态属性displayname，可以通过实例的type属性下访问到
    const { displayName } = childElement.type;
    if (displayName === 'MenuItem') {
      return React.cloneElement(childElement, {
        index,
      });
    } else {
      console.error('Warning: Menu has a child which is not a MenuItem content');
    }
  })
}
```

## Storybook




## JavaScript模块
### 什么是模块：
- 一组可重用的代码
- 可维护性
- 可重用性


