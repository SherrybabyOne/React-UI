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
获取props时，非更改的props直接使用rest参数传递给返回的html元素即可。

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
