import { quarterProps } from "./type.js";
import normalizeComponent from "./_virtual/_plugin-vue2_normalizer.js";
const _sfc_main = {
  name: "QuarterSelect",
  data() {
    const currentDate = new Date();
    const quarterOptions = [{
      months: [1, 2, 3],
      key: "Q1",
      label: "第一季度",
      disabled: false
    }, {
      months: [4, 5, 6],
      key: "Q2",
      label: "第二季度",
      disabled: false
    }, {
      months: [7, 8, 9],
      key: "Q3",
      label: "第三季度",
      disabled: false
    }, {
      months: [10, 11, 12],
      key: "Q4",
      label: "第四季度",
      disabled: false
    }];
    return {
      quarterDate: "",
      quarterOptions: JSON.parse(JSON.stringify(quarterOptions)),
      selectedYear: currentDate.getFullYear(),
      visible: false
    };
  },
  props: quarterProps,
  computed: {
    minimumYear() {
      if (this.year) {
        return new Date(this.year).getFullYear();
      }
      return "";
    },
    minimumMonth() {
      if (this.month) {
        return new Date(this.month).getMonth() + 1;
      }
      return "";
    },
    isDisabledReduceYear() {
      return this.minimumYear ? this.minimumYear >= this.selectedYear : false;
    },
    quarterRenderOptions() {
      const currQuarter = this.minimumMonth ? Math.floor(this.minimumMonth % 3 === 0 ? this.minimumMonth / 3 : this.minimumMonth / 3 + 1) : 0;
      const quarter = this.isSelectedCurrentQuarter ? currQuarter - 1 : currQuarter;
      return this.quarterOptions.map((item, index) => {
        const currentYearDsiabledQuarter = this.minimumYear ? this.selectedYear < this.minimumYear || this.selectedYear === this.minimumYear && quarter > index : false;
        return {
          ...item,
          disabled: currentYearDsiabledQuarter
        };
      });
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.$nextTick(() => {
          this.selectedYear = new Date().getFullYear();
        });
      }
    },
    value() {
      if (this.value) {
        this.quarterModal();
      }
    }
  },
  methods: {
    reduceYear() {
      if (!this.isDisabledReduceYear) {
        this.selectedYear--;
      }
    },
    addYear() {
      this.selectedYear++;
    },
    quarterModal() {
      if (this.value) {
        const dateArray = this.value.split("-");
        const monthVal = dateArray[1][0] === "0" ? Number(dateArray[1][1]) : Number(dateArray[1]);
        const quarterIdx = this.quarterOptions.findIndex((item) => item.months.includes(monthVal));
        this.selectedYear = Number(dateArray[0]);
        this.quarterDate = dateArray[0] + "-" + this.quarterOptions[quarterIdx].key;
      } else {
        if (!this.quarterRenderOptions.some((item) => item.disabled === false)) {
          this.addYear();
        }
      }
    },
    clearInputValue() {
      this.quarterDate = "";
      this.$emit("selected", "");
      this.$emit("change", "");
    },
    handleQuarter(item) {
      const selectMonth = item.months[0].length > 1 ? item.months[0] : "0" + item.months[0];
      this.quarterDate = this.selectedYear + "-" + item.key;
      this.visible = false;
      this.$emit("change", this.selectedYear + "-" + selectMonth);
      this.$emit("selected", this.selectedYear + "-" + selectMonth);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("a-popover", { attrs: { "placement": "bottomLeft", "title": "选择季度日期", "trigger": "click", "overlayClassName": "quarterPickerBox" }, model: { value: _vm.visible, callback: function($$v) {
    _vm.visible = $$v;
  }, expression: "visible" } }, [_c("template", { slot: "content" }, [_c("div", { staticClass: "content-year" }, [_c("span", { class: _vm.isDisabledReduceYear ? "disable" : "", on: { "click": _vm.reduceYear } }, [_c("a-icon", { attrs: { "type": "double-left" } })], 1), _c("i", [_vm._v(_vm._s(_vm.selectedYear))]), _c("span", { on: { "click": _vm.addYear } }, [_c("a-icon", { attrs: { "type": "double-right" } })], 1)]), _c("div", { staticClass: "quarterBtns" }, _vm._l(_vm.quarterRenderOptions, function(item) {
    return _c("a-button", { key: item.key, class: [{
      "quarterLabel": true,
      "quarterActive": _vm.quarterDate === _vm.selectedYear + "-" + item.key
    }], attrs: { "type": "link", "disabled": item.disabled }, on: { "click": function($event) {
      return _vm.handleQuarter(item);
    } } }, [_vm._v(" " + _vm._s(item.label) + " ")]);
  }), 1)]), _c("a-input", { class: { "has-quarter-value": _vm.quarterDate, "quarter-input": true }, style: { "width": _vm.inputWidth + "px" }, attrs: { "readOnly": "", "placeholder": "请选择季度生效日期" }, on: { "click": _vm.quarterModal }, model: { value: _vm.quarterDate, callback: function($$v) {
    _vm.quarterDate = typeof $$v === "string" ? $$v.trim() : $$v;
  }, expression: "quarterDate" } }, [_c("a-icon", { staticClass: "clear-icon", attrs: { "slot": "suffix", "type": "close-circle" }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.clearInputValue.apply(null, arguments);
  } }, slot: "suffix" }), _c("a-icon", { staticClass: "time-icon", attrs: { "slot": "suffix", "type": "calendar" }, slot: "suffix" })], 1)], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null,
  null,
  null
);
const vueQuarterPicker = __component__.exports;
export {
  vueQuarterPicker as default
};
