import * as path from "path";

import {Bean} from "beanconqueror";
import {processBCFile} from "@/lib/beanconqueror/statistics";
import {readZipFile} from "@/lib/beanconqueror/utils";
import {sortFnAsc} from "@/lib/sort";
import {stringToDate} from "@/lib/dates";

export function getCoffeeData() {
  const zip = path.join(process.cwd(), "/Beanconqueror.zip");
  const zipContents = readZipFile(zip);
  return processBCFile(zipContents);
}

export function backlogBeans(beans: Record<string, Bean>) {
  return (
    Object.entries<Bean>(beans)
      .map(([_, bean]) => bean)
      .filter(bean => !bean.finished)
      .sort((a, b) => {
        return sortFnAsc(stringToDate(a.roastingDate), stringToDate(b.roastingDate))
      })
  );
}