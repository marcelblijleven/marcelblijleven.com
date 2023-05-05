export interface Brew {
    uuid: string;
    name: string;
    timestamp: number;
    preparationMethod: string;
    grinder: string;
    grindSetting: string;
    ratioString: string;
    duration: number;
}

// NOTE: extend this if more info is needed in the frontend
export interface SimpleBean {
    // uuid: string;
    name: string;
    // aromatics: null | string;
    // buyDate: null | number;
    favourite: boolean;
    finished: boolean;
    roaster: null | string;
    // roastingDate: null | number;
    weight: null | number;
    // beanRoastingType: BeanRoastingType;
}

export interface SimpleGrinder {
    // uuid: string;
    name: string;
    // retired: boolean;
}

export interface SimplePreparation {
    // uuid: string;
    // retired: boolean;
    name: string;
    // styleType: string;
    // type: string;
}