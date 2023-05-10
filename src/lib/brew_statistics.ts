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
    if (key in mapping) {
        mapping[key] += value || 1;
    } else {
        mapping[key] = value || 1;
    }
}

function sortCountMappingAsc(mapping: Mapping<number>): Mapping<number> {
    return Object.entries(mapping).sort(([, a], [, b]) => a - b).reduce((r, [k, v]) => ({...r, [k]: v}), {});
}

function sortCountMappingDesc(mapping: Mapping<number>): Mapping<number> {
    return Object.entries(mapping).sort(([,a],[,b]) => b-a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

export function processBCFile(contents: string, callback: (data: BrewStatistics) => void) {
    const data = (JSON.parse(contents) as BCData);
    const preparationMapping = createMappingByUuid<Preparation>(data.PREPARATION);
    const beanMapping = createMappingByUuid<Bean>(data.BEANS);
    const grinderMapping = createMappingByUuid<Mill>(data.MILL);

    let lastBrewTime: number = 0;
    const roasterCount: Mapping<number> = {};
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
        bean.roaster && increaseCountOfKey(roasterCount, bean.roaster);
        bean.bean_information && bean.bean_information.forEach(
            info => {
                info.country && increaseCountOfKey(countryCount, info.country)
                info.variety && increaseCountOfKey(varietyCount, info.variety)
                info.processing && increaseCountOfKey(processingCount, info.processing)
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

    callback({
        roasterCount: sortCountMappingDesc(roasterCount),
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
    });
}

export interface BrewStatistics {
    roasterCount: Mapping<number>;
    countryCount: Mapping<number>;
    grinderCount: Mapping<number>;
    preparationCount: Mapping<number>;
    varietyCount: Mapping<number>;
    processingCount: Mapping<number>;
    beanCount: Mapping<number>;
    beanUsage: Mapping<number>;
    beanMapping: Mapping<Bean>;
    averageGrindWeight: number;
    averageBrewsPerDay: number;
    totalBrews: number;
    totalGroundBeans: number;
    lastBrew: Date;
}