import AdmZip, {IZipEntry} from "adm-zip"
import {BCData, Bean, Brew} from "@/types/beanconqueror";
import {HasConfigUUID, Mapping} from "@/types";


const BEANCONQUEROR_BASE = "Beanconqueror.json";
const BEANCONQUEROR_BEANS_RE = /^Beanconqueror_Beans_\d+.json$/;
const BEANCONQUEROR_BREWS_RE = /^Beanconqueror_Brews_\d+.json$/;

function readEntryToJSON(entry: IZipEntry): BCData {
    if (typeof entry.getData === "undefined") {
        return {MILL: [], PREPARATION: [], SETTINGS: [], VERSION: [], BEANS: [], BREWS: []}
    }

    const data = entry.getData();
    return JSON.parse(data.toString()) as BCData;
}

export function readZipFile(path: string): BCData {
    const zip = new AdmZip(path);
    const entries = zip.getEntries();
    if (!entries.length) {
        throw new Error("Empty zip file uploaded");
    }

    const baseEntry = entries.find(entry => entry.name === BEANCONQUEROR_BASE);

    if (!baseEntry) {
        throw new Error("Invalid zip file uploaded");
    }

    const baseData = readEntryToJSON(baseEntry);
    const additionalBeans = [];
    const additionalBrews = [];

    for (const entry of entries) {
        if (entry.name.includes("MACOS")) continue;

        const data = readEntryToJSON(entry);

        if (!!entry.name.match(BEANCONQUEROR_BEANS_RE)) {
            additionalBeans.push(...Array.from((data as unknown) as Bean[]));
            continue;
        }

        if (!!entry.name.match(BEANCONQUEROR_BREWS_RE)) {
            additionalBrews.push(...Array.from((data as unknown) as Brew[]));
        }
    }

    baseData.BEANS = baseData.BEANS.concat(additionalBeans);
    baseData.BREWS = baseData.BREWS.concat(additionalBrews);

    return baseData;
}

// Create a mapping of T from the provided Array, where the key is
// the UUID from the config property.
export function createMappingByUUID<T extends HasConfigUUID>(data: T[]): Mapping<T> {
    const mapping: Mapping<T> = {};

    for (let i = 0, n = data.length; i < n; i++) {
        const item = data[i];
        mapping[item.config.uuid] = item;
    }

    return mapping;
}

// Increase count/value of each key in the provided mapping
export function increaseCountOfKey(mapping: Mapping<number>, key: string, value?: number) {
    // Check if key consists of multiple keys
    if (key.includes(",")) {
        const subKeys = key.split(",");
        for (const subKey of subKeys) increaseCountOfKey(mapping, subKey, value);
        return
    }

    const lcKey = key.toLowerCase().trim();
    mapping[lcKey] = (mapping[lcKey] || 0) + (value || 1);
}

// Sort mapping by descending value
export function sortCountMappingDesc(mapping: Mapping<number>): [string, number][] {
    return Object.entries(mapping).sort(([,a],[,b]) => b-a);
}
