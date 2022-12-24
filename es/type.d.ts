import { ExtractPropTypes } from "vue";
export declare const quarterProps: {
    value: {
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
export declare type QuarterProps = ExtractPropTypes<typeof quarterProps>;
