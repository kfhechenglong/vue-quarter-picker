"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const quarterProps = {
  value: {
    type: String,
    default: ""
  },
  year: {
    type: [Number, String, Date],
    default: () => {
      return new Date();
    }
  },
  month: {
    type: [Number, String, Date],
    default: () => {
      return new Date();
    }
  },
  inputWidth: {
    type: Number,
    default: 250
  },
  isSelectedCurrentQuarter: {
    type: Boolean,
    default: false
  }
};
exports.quarterProps = quarterProps;
