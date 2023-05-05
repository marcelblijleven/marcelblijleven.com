import {Brew, SimpleBean, SimpleGrinder, SimplePreparation} from "@/types/coffee/brews";
import {BCData, Bean, Mill, Preparation, Brew as BCBrew} from "@/types/coffee/bc";

const EMPTY = "-";

interface Mapping<T> {
    [key: string]: T
}

interface ConfigItem {
    config: {uuid: string}
}

interface Statistics {
    brews: number;
    roasters: number;
    countries: number;
}

function getMapping<T extends ConfigItem>(data: T[]): Mapping<T> {
    const mapping: Mapping<T> = {}

    for (const item of data) {
        mapping[item.config.uuid] = item;
    }

    return mapping;
}

function getSimpleBeanMapping(data: Bean[]): Mapping<SimpleBean> {
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

function getSimpleGrinderMapping(data: Mill[]): Mapping<SimpleGrinder> {
    const mapping: Mapping<SimpleGrinder> = {};

    for (const grinder of data) {
        mapping[grinder.config.uuid] = {
            name: grinder.name
        }
    }

    return mapping;
}

function getSimplePreparationMapping(data: Preparation[]): Mapping<SimplePreparation> {
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

export function readBrewData(limit?: undefined | number): Brew[] {
    const data: BCData = require("./bc.json");
    const beans: Mapping<SimpleBean> = getSimpleBeanMapping(data.BEANS);
    const grinders: Mapping<SimpleGrinder> = getSimpleGrinderMapping(data.MILL);
    const preparationMethods: Mapping<SimplePreparation> = getSimplePreparationMapping(data.PREPARATION);

    let brews = data.BREWS.map(brew => {
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

    if (limit) {
        brews = brews.slice(0, 10);
    }

    return brews;
}

export function readStatistics(): Statistics {
    const data: BCData = require("./bc.json");
    const brews = data.BREWS.length;
    const roasters = new Set();
    const countries = new Set();
    const beans = getMapping<Bean>(data.BEANS);

    for (const brew of data.BREWS) {
        const country = beans[brew.bean]?.bean_information[0]["country"] || null;
        const roaster = beans[brew.bean].roaster;

        if (country) {
            countries.add(country);
        }

        if (roaster) {
            roasters.add(roaster)
        }
    }

    return {brews, roasters: roasters.size, countries: countries.size}
}