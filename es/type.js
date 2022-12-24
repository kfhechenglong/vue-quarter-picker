const quarterProps = {
  effectDate: {
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
export {
  quarterProps
};
