import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

export const notion = new NotionAPI();

export async function getPageData(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId);

  // notion-client@7.x returns blocks with a nested value.value structure,
  // but react-notion-x expects value directly. Unwrap if needed.
  for (const table of Object.keys(recordMap) as Array<keyof ExtendedRecordMap>) {
    const records = recordMap[table];
    if (records && typeof records === "object" && !Array.isArray(records)) {
      for (const [id, record] of Object.entries(records)) {
        const rec = record as Record<string, unknown>;
        if (rec?.value && typeof rec.value === "object" && (rec.value as Record<string, unknown>).value) {
          (records as Record<string, unknown>)[id] = {
            ...rec,
            value: (rec.value as Record<string, unknown>).value,
          };
        }
      }
    }
  }

  return recordMap;
}
