import { Outfit } from "next/font/google";
import "./globals.css";
import { GlobalProviders } from "@/providers";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import { SpeculationRules } from "@components/theme/SpeculationRules";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import clsx from "clsx";
import Script from "next/script";
import { Viewport } from "next";
import { Suspense } from "react";
import { SearchSkeleton } from "@components/common/skeleton/SearchSkeleton";
import HotwireAppToastComponent from "@/components/hotwire/components/HotwireAppToastComponent";
import HotwireAppHistorySyncComponent from "@/components/hotwire/components/HotwireAppHistorySyncComponent";
import HistorySync from "@/components/hotwire/HistorySync";
import HotwireAppThemeModeComponent from "@/components/hotwire/components/HotwireAppThemeModeComponent";
import TurboSearchRouterBridge from "@/components/hotwire/TurboSearchRouterBridge";
import HotwireAppDynamicButtonModalOpenAndDismissComponent from "@components/hotwire/components/HotwireAppDynamicButtonModalOpenAndDismissComponent";

export const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-outfit",
  display: "optional",
  preload: true,
});

export async function generateMetadata() {
  return generateMetadataForPage("", staticSeo.default);
}

// For Compatibility with Hotwire Native Apps : To avoid the zoom in of the pages inside the native apps.
export async function generateViewport(): Promise<Viewport> {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Hotwire BEFORE React hydration */}
        <Script
          id="hotwire-loader"
          strategy="beforeInteractive"
          src="/hotwire/bundle.js"
        />
      </head>
      <body className={clsx(
        "min-h-screen font-outfit text-foreground bg-background antialiased",
        outfit.variable
      )}>
        <main>
          <ErrorBoundary>
            <GlobalProviders>
              {children}
            </GlobalProviders>
            <SpeculationRules />
          </ErrorBoundary>
        </main>
        <span className="dsv-2025.04.19-7e29" />

        {/* Some Global Hotwire Functions Init */}
        <Suspense fallback={null}>
          <HistorySync />
        </Suspense>

        <Suspense fallback={<SearchSkeleton />}>
          <TurboSearchRouterBridge />
        </Suspense>

        {/* Hotwire Component Call */}
        <HotwireAppToastComponent />

        {/* Hotwire History Sync Component */}
        <HotwireAppHistorySyncComponent />

        {/*  Hotwire Theme Mode Component */}
        <HotwireAppThemeModeComponent />

        {/* Hotwire Modal Open and Dismiss Component */}
        <HotwireAppDynamicButtonModalOpenAndDismissComponent />
      </body>
    </html>
  );
}
