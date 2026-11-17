import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

// Notion answers 403 to Node's default user-agent, so send an explicit one.
export const notion = new NotionAPI({
  ofetchOptions: { headers: { "user-agent": "Mozilla/5.0 (compatible; portfolio-site)" } },
});

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

  // Children of collapsed toggles are not in the page chunk: fetch them until none is missing.
  const blocks = recordMap.block as Record<string, { value?: { content?: string[] } }>;
  for (let pass = 0; pass < 5; pass++) {
    const missing = Object.values(blocks)
      .flatMap((b) => b?.value?.content ?? [])
      .filter((id) => !blocks[id]);
    if (missing.length === 0) break;
    const fetched = (await notion.getBlocks(missing)).recordMap.block as Record<string, { value?: { value?: unknown } }>;
    for (const [id, rec] of Object.entries(fetched)) {
      blocks[id] = (rec?.value?.value ? { ...rec, value: rec.value.value } : rec) as (typeof blocks)[string];
    }
  }

  return recordMap;
}
