import {Brew, SimpleBean, SimpleGrinder, SimplePreparation} from "@/types/coffee/brews";
import {BCData, Bean, Mill, Preparation, Brew as BCBrew} from "@/types/coffee/bc";

const EMPTY = "-";

interface Mapping<T> {
    [key: string]: T
}

function getBeansMapping(data: Bean[]): Mapping<SimpleBean> {
    const mapping: Mapping<SimpleBean> = {};

    for (const bean of data) {
        mapping[bean.config.uuid] = {
            name: bean.name,
            roaster: bean.roaster || EMPTY,
            weight: bean.weight,
            favourite: bean.favourite,
            finished: bean.finished,
        }
    }

    return mapping;
}

function getGrinderMapping(data: Mill[]): Mapping<SimpleGrinder> {
    const mapping: Mapping<SimpleGrinder> = {};

    for (const grinder of data) {
        mapping[grinder.config.uuid] = {
            name: grinder.name
        }
    }

    return mapping;
}

function getPreparationMapping(data: Preparation[]): Mapping<SimplePreparation> {
    const mapping: Mapping<SimplePreparation> = {};

    for (const prep of data) {
        mapping[prep.config.uuid] = {
            name: prep.name
        }
    }

    return mapping;
}

function getName(brew: BCBrew, beans: Mapping<SimpleBean>): string {
    const bean = beans[brew.bean];

    if (bean.roaster !== null) {
        return `${bean.name} (${bean.roaster})`;
    }

    return bean.name
}

function getRatioString(gramsIn: null | number, gramsOut: null | number): string {
    const empty = "-";

    if (gramsIn === null && gramsOut === null) {
        return "-/-";
    }

    if (gramsIn !== null && gramsIn > 0 && gramsOut !== null && gramsOut > 0) {
        return `${gramsIn}/${gramsOut} (1/${Math.round((gramsOut /  gramsIn)  * 100) / 100})`;
    }

    return `${gramsIn || empty}/${gramsOut || empty}`

}

export function readBrewData(): Brew[] {
    const data: BCData = require("./bc.json");
    const beans: Mapping<SimpleBean> = getBeansMapping(data.BEANS);
    const grinders: Mapping<SimpleGrinder> = getGrinderMapping(data.MILL);
    const preparationMethods: Mapping<SimplePreparation> = getPreparationMapping(data.PREPARATION);
    return data.BREWS.map(brew => {
        return {
            uuid: brew.config.uuid,
            name: getName(brew, beans),
            timestamp: brew.config.unix_timestamp,
            preparationMethod: !!brew.method_of_preparation ? preparationMethods[brew.method_of_preparation].name : EMPTY,
            grinder: !!brew.mill ? grinders[brew.mill].name : EMPTY,
            grindSetting: brew.grind_size,
            ratioString: getRatioString(brew.grind_weight, brew.brew_quantity),
            duration: brew.brew_time
        }
    }).sort((a: Brew, b: Brew) => {
        // Sorted latest first
        if (a.timestamp < b.timestamp) {
            return 1;
        }

        if (a.timestamp > b.timestamp) {
            return -1
        }

        return 0;
    });
}