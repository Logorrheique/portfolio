import type { Metadata } from "next";
import "./globals.css";

const title = "Arthur Couteau — Full-Stack & DevOps Engineer";
const description =
  "Full-stack and DevOps engineer: TypeScript, React, Node.js, Python — backend, operations and production. Paris area, open to remote.";
// On Vercel, use the real production domain so social-preview URLs are canonical.
const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://arthur-couteau.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  authors: [{ name: "Arthur Couteau" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    url,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Arthur Couteau — Full-Stack & DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
