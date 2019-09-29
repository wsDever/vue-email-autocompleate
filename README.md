## vue图片展示插件

#### 主要功能
###### 图片查看，支持图片放大、缩小、翻转等功能

#### 使用方法
###### 安装
> npm i vue-email-autocompleate

###### 引入
```
import emailAutocompleate from vue-email-autocompleate

```

###### 页面中添加组件
```
<email-input></email-input>
```

###### 使用
```
Vue.use(emailAutocompleate)
```
#### 参数说明
```
url: string          ---- 要展示的图片地址
toolbar: boolen      ---- 是否显示工具栏，默认不显示
tools: Array         ---- 工具栏（放大，缩小，旋转）
onClose: func        ---- 关闭图片时的函数 ，默认空
```
#### 更新记录
###### 2019-06-13 -1.0.0
###### 1、点击图片可查看
###### 2、关闭添加回调函数

###### 2019-06-17 -2.0.0
###### 1、添加图片旋转、放大、缩小功能


#### Demo效果
[点击查看](https://wsdever.github.io/vue-email-autocompleate/)
