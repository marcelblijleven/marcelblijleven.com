import {createMappingByUUID, increaseCountOfKey, sortCountMappingDesc} from "@/lib/beanconqueror/utils";
import {BCData, Bean, Brew, Mill, Preparation} from "beanconqueror";

interface BeanStatistics {
    roasterCount: [string, number][];
    roasterCountWeight: [string, number][];
    countryCount: [string, number][];
    varietyCount: [string, number][];
    processingCount: [string, number][];
}

interface BrewStatistics {
    lastBrew: Date;
    brewsPerDay: Record<string, number>;
    averageBrewsPerDay: number;
    totalGroundWeight: number;
    averageGrindWeight: number;
    usagePerBean: Record<string, number>;
    brewsPerBean:  Record<string, number>;
    usagePerGrinder: [string, number][];
    brewsPerGrinder: [string, number][];
    brewsPerPreparationMethod: [string, number][];
    brews: Brew[];
    totalBrews: number;
}

export interface Statistics extends BeanStatistics, BrewStatistics {
    beanMapping: Record<string, Bean>;
    grinderMapping: Record<string, Mill>;
    preparationMapping: Record<string, Preparation>
}

function getBeanStatistics(beans: Bean[]): BeanStatistics {
    const roasterCount: Record<string, number> = {};
    const roasterCountWeight: Record<string, number> = {};
    const countryCount: Record<string, number> = {};
    const varietyCount: Record<string, number> = {};
    const processingCount: Record<string, number> = {};

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
    const brewsPerDay: Record<string, number> = {};
    const brewsPerBean: Record<string, number> = {};
    const usagePerBean: Record<string, number> = {};
    const brewsPerGrinder: Record<string, number> = {};
    const usagePerGrinder: Record<string, number> = {};
    const brewsPerPreparationMethod: Record<string, number> = {};
    const grindWeights: number[] = [];
    let lastBrewTime: number = 0;

    for (const brew  of brews) {
        // Brews per day
        if (!brew.config.unix_timestamp) {
            continue
        }
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
        usagePerBean: usagePerBean,
        brewsPerBean: brewsPerBean,
        usagePerGrinder: sortCountMappingDesc(usagePerGrinder),
        brewsPerGrinder: sortCountMappingDesc(brewsPerGrinder),
        brewsPerPreparationMethod: sortCountMappingDesc(brewsPerPreparationMethod),
        totalBrews: brews.length,
        averageBrewsPerDay,
        brews,
    };
}


export function processBCFile(contents: string | BCData): Statistics {
    let data: BCData

    if (typeof contents === "string") {
        data = (JSON.parse(contents) as BCData)
    } else {
        data = contents
    }

    const preparationMapping = createMappingByUUID<Preparation>(data.PREPARATION);
    const beanMapping = createMappingByUUID<Bean>(data.BEANS);
    const grinderMapping = createMappingByUUID<Mill>(data.MILL);
    const brewStatistics = getBrewStatistics(data.BREWS);
    const beanStatistics = getBeanStatistics(data.BEANS);

    return <Statistics>{
        beanMapping,
        grinderMapping,
        preparationMapping,
        ...brewStatistics,
        ...beanStatistics,
    };
}