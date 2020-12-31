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
