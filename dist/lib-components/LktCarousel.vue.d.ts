import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: number;
    page: number;
    itemsToShow?: number | undefined;
    itemsToScroll?: number | undefined;
    autoplay?: number | undefined;
    wrapAround?: boolean | undefined;
    mouseDrag?: boolean | undefined;
    touchDrag?: boolean | undefined;
    pauseAutoplayOnHover?: boolean | undefined;
    dir?: "ltr" | "rtl" | undefined;
    snapAlign?: "center" | "end" | "start" | "center-odd" | "center-even" | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    title: string;
    noResultsText: string;
    createText: string;
    carouselClass: string;
    filters: LktObject;
}>, {
    modelValue: number;
    page: number;
    itemsToShow: number;
    itemsToScroll: number;
    autoplay: number;
    wrapAround: boolean;
    mouseDrag: boolean;
    touchDrag: boolean;
    pauseAutoplayOnHover: boolean;
    dir: string;
    snapAlign: string;
    resource: string;
    resourceData: () => {};
    title: string;
    carouselClass: string;
    noResultsText: string;
    createText: string;
    filters: () => {};
}>, {
    doRefresh: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    create: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: number;
    page: number;
    itemsToShow?: number | undefined;
    itemsToScroll?: number | undefined;
    autoplay?: number | undefined;
    wrapAround?: boolean | undefined;
    mouseDrag?: boolean | undefined;
    touchDrag?: boolean | undefined;
    pauseAutoplayOnHover?: boolean | undefined;
    dir?: "ltr" | "rtl" | undefined;
    snapAlign?: "center" | "end" | "start" | "center-odd" | "center-even" | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    title: string;
    noResultsText: string;
    createText: string;
    carouselClass: string;
    filters: LktObject;
}>, {
    modelValue: number;
    page: number;
    itemsToShow: number;
    itemsToScroll: number;
    autoplay: number;
    wrapAround: boolean;
    mouseDrag: boolean;
    touchDrag: boolean;
    pauseAutoplayOnHover: boolean;
    dir: string;
    snapAlign: string;
    resource: string;
    resourceData: () => {};
    title: string;
    carouselClass: string;
    noResultsText: string;
    createText: string;
    filters: () => {};
}>>> & {
    onCreate?: ((...args: any[]) => any) | undefined;
}, {
    page: number;
    title: string;
    dir: "ltr" | "rtl";
    filters: LktObject;
    resource: string;
    autoplay: number;
    modelValue: number;
    itemsToShow: number;
    itemsToScroll: number;
    wrapAround: boolean;
    mouseDrag: boolean;
    touchDrag: boolean;
    pauseAutoplayOnHover: boolean;
    snapAlign: "center" | "end" | "start" | "center-odd" | "center-even";
    resourceData: LktObject;
    noResultsText: string;
    createText: string;
    carouselClass: string;
}, {}>, Partial<Record<any, (_: {}) => any>> & {
    title?(_: {}): any;
    buttons?(_: {}): any;
    filters?(_: {
        items: never[];
        isLoading: boolean;
    }): any;
    item?(_: {
        item: never;
        canCreate: boolean;
        canRead: boolean;
        canUpdate: boolean;
        canDrop: boolean;
        isLoading: boolean;
    }): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
