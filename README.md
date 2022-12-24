# vue-quarter-picker
## 介绍
一款基于`Vue2.0`+`Ant Design`的季度选择组件。

```
npm install vue-quarter-picker --save
```

# API

| props | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value | 默认值 | string | "" |  |
| year | 最小的年份 | [Number, String, Date] | new Date() |  |
| month | 年度最小的月份 | [Number, String, Date] | new Date() |  |
| inputWidth | 文本框的宽度 | Number | 250 |  |
| isSelectedCurrentQuarter | 是否可以选择当前季度 | Boolean | false
| @change | 选择框改变时的事件 | Function | (value) => {}



## 使用示例

### 注册指令

```js
import { QuarterSelect } from 'vue-quarter-picker'
export default {
    components: {
        QuarterSelect
    }
}
```

### 在组件中使用
```html
<div>
    <QuarterSelect
        @selected="selectedQuarter"
        ref="quarterSelect"
        v-model="rateForm.effectDate">
    </QuarterSelect>
</div>
```
