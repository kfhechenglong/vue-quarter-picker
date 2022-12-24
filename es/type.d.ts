export declare const quarterProps: {
    effectDate: {
        type: StringConstructor;
        default: string;
    };
    year: {
        type: (StringConstructor | NumberConstructor | DateConstructor)[];
        default: () => Date;
    };
    month: {
        type: (StringConstructor | NumberConstructor | DateConstructor)[];
        default: () => Date;
    };
    inputWidth: {
        type: NumberConstructor;
        default: number;
    };
    isSelectedCurrentQuarter: {
        type: BooleanConstructor;
        default: boolean;
    };
};
