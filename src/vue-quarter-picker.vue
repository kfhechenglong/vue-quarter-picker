<template>
  <a-popover v-model="visible" placement="bottomLeft" title="选择季度日期" trigger="click" overlayClassName="quarterPickerBox">
    <template slot="content">
      <div class="content-year">
        <span :class="isDisabledReduceYear ? 'disable' : ''" @click="reduceYear">
          <a-icon type="double-left" />
        </span>
        <i>{{ selectedYear }}</i>
        <span @click="addYear">
          <a-icon type="double-right" />
        </span>
      </div>
      <div class="quarterBtns">
        <a-button
          v-for="item in quarterRenderOptions"
          :key="item.key"
          type="link"
          :disabled="item.disabled"
          :class="[{
            'quarterLabel': true,
            'quarterActive': quarterDate === selectedYear + '-' + item.key
          }]"
          @click="handleQuarter(item)">
          {{item.label}}
        </a-button>
      </div>
    </template>
    <a-input
      readOnly
      placeholder="请选择季度生效日期"
      v-model.trim="quarterDate"
      @click="quarterModal(effectDate)"
      :class="{'has-quarter-value': quarterDate, 'quarter-input': true}"
      :style="{'width': inputWidth + 'px'}"
    >
      <a-icon class="clear-icon" slot="suffix" type="close-circle" @click.stop="clearInputValue"/>
      <a-icon class="time-icon" slot="suffix" type="calendar" />
    </a-input>
  </a-popover>
</template>
<script>
  import { quarterProps } from "./type"
  export default {
    name: 'QuarterSelect',
    data () {
      const currentDate = new Date() // 当前时间
      // 季度数据
      const quarterOptions = [{
        months: [1, 2, 3],
        key: 'Q1',
        label: '第一季度',
        disabled: false
      }, {
        months: [4, 5, 6],
        key: 'Q2',
        label: '第二季度',
        disabled: false
      }, {
        months: [7, 8, 9],
        key: 'Q3',
        label: '第三季度',
        disabled: false
      }, {
        months: [10, 11, 12],
        key: 'Q4',
        label: '第四季度',
        disabled: false
      }]
      return {
        quarterDate: '', // 季度日期
        quarterOptions: JSON.parse(JSON.stringify(quarterOptions)),
        selectedYear: currentDate.getFullYear(), // 选择的年份
        visible: false
      }
    },
    props: quarterProps,
    computed: {
      minimumYear () {
        if (this.year) {
          return new Date(this.year).getFullYear()
        }
        return ''
      },
      minimumMonth () {
        if (this.month) {
          return new Date(this.month).getMonth() + 1
        }
        return ''
      },
      // 是否紧张点击上一年
      isDisabledReduceYear () {
        return this.minimumYear ? this.minimumYear >= this.selectedYear : false
      },
      quarterRenderOptions () {
        const currQuarter = this.minimumMonth ? Math.floor((this.minimumMonth % 3 === 0 ? (this.minimumMonth / 3) : (this.minimumMonth / 3 + 1))) : 0 // 当前季度
        const quarter = this.isSelectedCurrentQuarter ? currQuarter - 1 : currQuarter
        // 处理当前选择年的季度是否可选
        return this.quarterOptions.map((item, index) => {
          // 如果选择的年度小于最小限制的年度，则该年度下的季度禁止选择
          // 如果选择的年度等于最小限制的年度，则该年度下小于最小季度的禁止选择
          const currentYearDsiabledQuarter = this.minimumYear ? (this.selectedYear < this.minimumYear || (this.selectedYear === this.minimumYear && quarter > index)) : false
          return {
            ...item,
            disabled: currentYearDsiabledQuarter
          }
        })
      }
    },
    watch: {
      visible () {
        if (!this.visible) {
          // 关闭弹框后，重置默认的年度
          this.$nextTick(() => {
            this.selectedYear = new Date().getFullYear()
          })
        }
      }
    },
    methods: {
      reduceYear () {
        // 减少年份
        if (!this.isDisabledReduceYear) {
          this.selectedYear--
        }
      },
      addYear () {
        // 增加年份
        this.selectedYear++
      },
      quarterModal (effectDate) {
        if (effectDate) {
          const dateArray = effectDate.split('-') // 时间集合
          const monthVal = dateArray[1][0] === '0' ? Number(dateArray[1][1]) : Number(dateArray[1]) // 获取到月份
          const quarterIdx = this.quarterOptions.findIndex(item => item.months.includes(monthVal))
          this.selectedYear = Number(dateArray[0])
          this.quarterDate = dateArray[0] + '-' + this.quarterOptions[quarterIdx].key
        } else {
          // 如果没有默认值，则面板默认显示到可以选择的季度年
          // 查询当前数据的季度是否为全部禁止选择的，如果是，则默认回显下一年度
          if (!this.quarterRenderOptions.some(item => item.disabled === false)) {
            this.addYear()
          }
        }
      },
      // 清空内容
      clearInputValue () {
        this.quarterDate = ''
        this.$emit('quarterOK', '')
      },
      // 选择季度
      handleQuarter (item) {
        const selectMonth = item.months[0].length > 1 ? item.months[0] : '0' + item.months[0]
        this.quarterDate = this.selectedYear + '-' + item.key
        this.visible = false
        this.$emit('quarterOK', this.selectedYear + '-' + selectMonth)
      }
    }
    // components: {
    //   [Popover.name]: Popover,
    //   [Input.name]: Input,
    //   [Icon.name]: Icon
    // }
  }
</script>
