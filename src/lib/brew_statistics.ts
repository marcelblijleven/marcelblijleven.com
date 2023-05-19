import {BCData, Bean, Brew, Mill, Preparation} from "@/types/coffee/bc";

interface Mapping<T> {
    [key: string]: T
}

interface HasConfigUUID {
    config: {uuid: string}
}

function createMappingByUuid<T extends HasConfigUUID>(data: T[]): Mapping<T> {
    const mapping: Mapping<T> = {};
    data.forEach(item => mapping[item.config.uuid] = item);
    return mapping;
}


function increaseCountOfKey(mapping: Mapping<number>, key: string, value?: number) {
    if (key.includes(",")) {
        key.split(",").forEach((subKey => {
            increaseCountOfKey(mapping, subKey, value);
        }));

        return
    }

    const lcKey = key.toLowerCase().trim();
    if (lcKey in mapping) {
        mapping[lcKey] += value || 1;
    } else {
        mapping[lcKey] = value || 1;
    }
}

// function sortCountMappingAsc(mapping: Mapping<number>): [string, number][] {
//     return Object.entries(mapping).sort(([,a],[,b]) => a-b);
// }

function sortCountMappingDesc(mapping: Mapping<number>): [string, number][] {
    return Object.entries(mapping).sort(([,a],[,b]) => b-a);
}

export function processMyBCFile(): Statistics {
    const bcData = require("./bc.json");
    return processBCFile(bcData)
}

interface BeanStatistics {
    roasterCount: [string, number][];
    roasterCountWeight: [string, number][];
    countryCount: [string, number][];
    varietyCount: [string, number][];
    processingCount: [string, number][];
}

interface BrewStatistics {
    lastBrew: Date;
    brewsPerDay: Mapping<number>;
    averageBrewsPerDay: number;
    totalGroundWeight: number;
    averageGrindWeight: number;
    usagePerBean: [string, number][];
    brewsPerBean:  Mapping<number>;
    usagePerGrinder: [string, number][];
    brewsPerGrinder: [string, number][];
    brewsPerPreparationMethod: [string, number][];
    totalBrews: number;
}

export interface Statistics extends BeanStatistics, BrewStatistics {
    beanMapping: Mapping<Bean>;
    grinderMapping: Mapping<Mill>;
    preparationMapping: Mapping<Preparation>
}

function getBeanStatistics(beans: Bean[]): BeanStatistics {
    const roasterCount: Mapping<number> = {};
    const roasterCountWeight: Mapping<number> = {};
    const countryCount: Mapping<number> = {};
    const varietyCount: Mapping<number> = {};
    const processingCount: Mapping<number> = {};

    for (const bean of beans) {
        if (bean.roaster) {
            const roaster = bean.roaster.trim();
            increaseCountOfKey(roasterCount, roaster);
            increaseCountOfKey(roasterCountWeight, roaster, bean.weight || 0);
        }

        bean.bean_information && bean.bean_information.forEach(info => {
            info.country && increaseCountOfKey(countryCount, info.country.trim());
            info.variety && increaseCountOfKey(varietyCount, info.variety.trim());
            info.processing && increaseCountOfKey(processingCount, info.processing.trim());
        })
    }

    return {
        roasterCount: sortCountMappingDesc(roasterCount),
        roasterCountWeight: sortCountMappingDesc(roasterCountWeight),
        countryCount: sortCountMappingDesc(countryCount),
        varietyCount: sortCountMappingDesc(varietyCount),
        processingCount: sortCountMappingDesc(processingCount),
    };
}

function getBrewStatistics(brews: Brew[]): BrewStatistics {
    const brewsPerDay: Mapping<number> = {};
    const brewsPerBean: Mapping<number> = {};
    const usagePerBean: Mapping<number> = {};
    const brewsPerGrinder: Mapping<number> = {};
    const usagePerGrinder: Mapping<number> = {};
    const brewsPerPreparationMethod: Mapping<number> = {};
    const grindWeights: number[] = [];
    let lastBrewTime: number = 0;

    for (const brew  of brews) {
        // Brews per day
        const date = new Date(brew.config.unix_timestamp * 1000);
        increaseCountOfKey(brewsPerDay, date.toDateString());

        // Last brew time
        lastBrewTime = Math.max(lastBrewTime, date.getTime());

        // Brews per bean
        increaseCountOfKey(brewsPerBean, brew.bean);

        if (brew.grind_weight) {
            // Usage per bean
            increaseCountOfKey(usagePerBean, brew.bean, brew.grind_weight)

            // Usage per grinder
            increaseCountOfKey(usagePerGrinder, brew.mill, brew.grind_weight)

            // Total usage
            grindWeights.push(brew.grind_weight)
        }

        // Brews per grinder
        increaseCountOfKey(brewsPerGrinder, brew.mill)

        // Brews per preparation method
        increaseCountOfKey(brewsPerPreparationMethod, brew.method_of_preparation)
    }

    const totalGroundWeight = grindWeights.reduce((prev, current) => prev + current, 0);
    const averageGroundWeight = totalGroundWeight / grindWeights.length;
    const averageBrewsPerDay = brews.length / Object.keys(brewsPerDay).length;

    return {
        lastBrew: new Date(lastBrewTime),
        brewsPerDay: brewsPerDay,
        totalGroundWeight,
        averageGrindWeight: averageGroundWeight,
        usagePerBean: sortCountMappingDesc(usagePerBean),
        brewsPerBean: brewsPerBean,
        usagePerGrinder: sortCountMappingDesc(usagePerGrinder),
        brewsPerGrinder: sortCountMappingDesc(brewsPerGrinder),
        brewsPerPreparationMethod: sortCountMappingDesc(brewsPerPreparationMethod),
        totalBrews: brews.length,
        averageBrewsPerDay,
    };
}


export function processBCFile(contents: string | BCData, callback?: (data: Statistics) => void): Statistics {
    let data: BCData

    if (typeof contents === "string") {
        data = (JSON.parse(contents) as BCData)
    } else {
        data = contents
    }

    const preparationMapping = createMappingByUuid<Preparation>(data.PREPARATION);
    const beanMapping = createMappingByUuid<Bean>(data.BEANS);
    const grinderMapping = createMappingByUuid<Mill>(data.MILL);
    const brewStatistics = getBrewStatistics(data.BREWS);
    const beanStatistics = getBeanStatistics(data.BEANS);

    const statistics = {
        beanMapping,
        grinderMapping,
        preparationMapping,
        ...brewStatistics,
        ...beanStatistics,
    }

    if (callback) {
        callback(statistics);
    }

    return statistics;
}
