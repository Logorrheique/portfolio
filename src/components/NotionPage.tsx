"use client";

import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

// Core styles
import "react-notion-x/src/styles.css";

// Syntax highlighting for code blocks
import "prismjs/themes/prism-tomorrow.css";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={darkMode}
      disableHeader={true}
    />
  );
}
