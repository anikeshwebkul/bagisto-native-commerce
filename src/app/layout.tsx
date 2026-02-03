import { Outfit } from "next/font/google";
import "./globals.css";
import {
  AppWrapper,
  ReduxProvider,
  ThemeProvider,
  ToastProvider,
  SessionProvider,
} from "@/providers";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SpeculationRules } from "@components/theme/SpeculationRules";
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
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/logout" } },
                      { not: { href_matches: "/*\\?*(^|&)add-to-cart=*" } },
                      { not: { selector_matches: ".no-prerender" } },
                      { not: { selector_matches: "[rel~=nofollow]" } },
                    ],
                  },
                },
              ],
              prefetch: [
                {
                  urls: ["next.html", "next2.html"],
                  requires: ["anonymous-client-ip-when-cross-origin"],
                  referrer_policy: "no-referrer",
                },
              ],
            }),
          }}
        />

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
          <ThemeProvider>
            <SessionProvider>
              <ToastProvider>
                <ReactQueryProvider>
                  <ReduxProvider>
                    <AppWrapper>
                      {children}
                    </AppWrapper>
                  </ReduxProvider>
                </ReactQueryProvider>
              </ToastProvider>
            </SessionProvider>
            <SpeculationRules />
          </ThemeProvider>
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
