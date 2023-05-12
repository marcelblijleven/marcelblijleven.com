import {BCData, Bean, Mill, Preparation} from "@/types/coffee/bc";

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

function sortCountMappingAsc(mapping: Mapping<number>): [string, number][] {
    return Object.entries(mapping).sort(([,a],[,b]) => a-b);
}

function sortCountMappingDesc(mapping: Mapping<number>): [string, number][] {
    return Object.entries(mapping).sort(([,a],[,b]) => b-a);
}

export function processMyBCFile(): BrewStatistics {
    const bcData = require("./bc.json");
    return processBCFile(bcData)
}

export function processBCFile(contents: string | BCData, callback?: (data: BrewStatistics) => void): BrewStatistics {
    let data: BCData

    if (typeof contents === "string") {
        data = (JSON.parse(contents) as BCData)
    } else {
        data = contents
    }

    const preparationMapping = createMappingByUuid<Preparation>(data.PREPARATION);
    const beanMapping = createMappingByUuid<Bean>(data.BEANS);
    const grinderMapping = createMappingByUuid<Mill>(data.MILL);

    let lastBrewTime: number = 0;
    const roasterCount: Mapping<number> = {};
    const roasterCountWeight: Mapping<number> = {};
    const countryCount: Mapping<number> = {};
    const varietyCount: Mapping<number> = {};
    const processingCount: Mapping<number> = {};
    const grinderCount: Mapping<number> = {};
    const preparationCount: Mapping<number> = {};
    const beanCount: Mapping<number> = {};
    const beanUsage: Mapping<number> = {};
    const brewPerDay: Mapping<number> = {};
    const grindWeights: number[] = [];

    for (const bean of data.BEANS) {
        if (bean.roaster) {
            const roaster = bean.roaster.trim();
            increaseCountOfKey(roasterCount, roaster);
            increaseCountOfKey(roasterCountWeight, roaster, bean.weight || 0);
        }
        bean.bean_information && bean.bean_information.forEach(
            info => {
                info.country && increaseCountOfKey(countryCount, info.country.trim())
                info.variety && increaseCountOfKey(varietyCount, info.variety.trim())
                info.processing && increaseCountOfKey(processingCount, info.processing.trim())
            }
        );
    }

    for (const brew of data.BREWS) {
        // Brews per day
        const date = new Date(brew.config.unix_timestamp * 1000);
        increaseCountOfKey(brewPerDay, date.toDateString());
        lastBrewTime = Math.max(lastBrewTime, date.getTime());

        // Total ground weight
        brew.grind_weight && grindWeights.push(brew.grind_weight);

        // Bean used
        const bean = beanMapping[brew.bean];

        if (bean) {
            // Count usage per bean
            increaseCountOfKey(beanUsage, bean.name, brew.grind_weight);

            // Count brews per bean
            increaseCountOfKey(beanCount, beanMapping[brew.bean].name);
        }

        // Grinder used
        const grinder = grinderMapping[brew.mill];

        if (grinder) {
            // Count usage per grinder
            increaseCountOfKey(grinderCount, grinder.name);
        }

        // Preparation method used
        const preparation = preparationMapping[brew.method_of_preparation];

        if (preparation) {
            increaseCountOfKey(preparationCount, preparation.name);
        }

    }

    const totalGroundBeans = grindWeights.reduce((a, b) => a + b, 0);

    const statistics = {
        roasterCount: sortCountMappingDesc(roasterCount),
        roasterCountWeight: sortCountMappingDesc(roasterCountWeight),
        countryCount: sortCountMappingDesc(countryCount),
        grinderCount: sortCountMappingDesc(grinderCount),
        beanCount: sortCountMappingDesc(beanCount),
        preparationCount: sortCountMappingDesc(preparationCount),
        varietyCount: sortCountMappingDesc(varietyCount),
        processingCount: sortCountMappingDesc(processingCount),
        beanUsage: beanUsage,
        beanMapping: beanMapping,
        averageGrindWeight: totalGroundBeans / grindWeights.length,
        averageBrewsPerDay: Object.values(brewPerDay).reduce(
            (a, b) => a + b, 0
        ) / Object.keys(brewPerDay).length,
        totalBrews: data.BREWS.length,
        totalGroundBeans: totalGroundBeans,
        lastBrew: new Date(lastBrewTime)
    }

    if (callback) {
        callback(statistics);
    }

    return statistics;
}

export interface BrewStatistics {
    roasterCount: [string, number][];
    roasterCountWeight: [string, number][];
    countryCount: [string, number][];
    grinderCount: [string, number][];
    preparationCount: [string, number][];
    varietyCount: [string, number][];
    processingCount: [string, number][];
    beanCount: [string, number][];
    beanUsage: Mapping<number>;
    beanMapping: Mapping<Bean>;
    averageGrindWeight: number;
    averageBrewsPerDay: number;
    totalBrews: number;
    totalGroundBeans: number;
    lastBrew: Date;
}