import { getPageData } from "@/lib/notion";
import NotionPage from "@/components/NotionPage";

// Revalidate every hour (or set to false for static)
export const revalidate = 3600;

export default async function Home() {
  const pageId = process.env.NOTION_PAGE_ID;

  if (!pageId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Required</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please set <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">NOTION_PAGE_ID</code> in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  const recordMap = await getPageData(pageId);

  return <NotionPage recordMap={recordMap} />;
}
