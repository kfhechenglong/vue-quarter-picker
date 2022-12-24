// import {ExtractPropTypes} from "vue";
// 定义按钮类型
export const quarterProps = {
    // 生效时间
    effectDate: {
        type: String,
        default: ''
    },
    // 最小的年份
    year: {
        type: [Number, String, Date],
        default: () => {
            return new Date()
        }
    },
    // 年度最小的月份
    month: {
        type: [Number, String, Date],
        default: () => {
            return new Date()
        }
    },
    inputWidth: {
        type: Number,
        default: 250
    },
    // 是否可以选择当前季度
    isSelectedCurrentQuarter: {
        type: Boolean,
        default: false
    }
};

// export type QuarterProps = ExtractPropTypes<typeof quarterProps>
