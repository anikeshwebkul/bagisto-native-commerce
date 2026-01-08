import { Metadata, Viewport } from "next";
import clsx from "clsx";
import "@/styles/globals.css";
import NextAuthProvider from "./providers/next-auth-provider";
import { TanstackProvider } from "./providers/tanstack-provider";
import { ReduxProvider } from "./providers/redux-provider";
import { ToastProvider } from "./context/toast-context";
import { siteConfig } from "@/config/site";
import { outfit } from "@/config/fonts";
import { Providers } from "@/app/providers/providers";
import { ToastContainer } from "@/components/elements/react-toasted/toast-container";
import Script from "next/script";
import '@bagisto-native/core';
import HotwireAppToastComponent from "@/components/hotwire/components/HotwireAppToastComponent";
import HotwireAppHistorySyncComponent from "@/components/hotwire/components/HotwireAppHistorySyncComponent";
import HistorySync from "@/components/hotwire/HistorySync";
import HotwireAppThemeModeComponent from "@/components/hotwire/components/HotwireAppThemeModeComponent";
import HotwireAppDynamicButtonCartCountComponent from "@/components/hotwire/components/HotwireAppDynamicButtonCartCountComponent";
import TurboSearchRouterBridge from "@/components/hotwire/TurboSearchRouterBridge";
import IsTurboNativeUserAgentFromServerComponent from "@/components/hotwire/IsTurboNativeUserAgentFromServerComponent";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  ...siteConfig,
  icons: {
    icon: "/favicon.svg",
  },
};

// For Compatibility with Hotwire Native Apps & also sending the needed meta tags to web only evnironment.
export async function generateViewport(): Promise<Viewport> {
  const isHotwireNative = await IsTurboNativeUserAgentFromServerComponent();

  if (isHotwireNative) {
    return {
      themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    };
  }

  return {
     themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={clsx(
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 dark:scrollbar-thumb-neutral-300"
      )}
      suppressHydrationWarning
      lang="en"
    >
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
      <body
        className={clsx(
          "min-h-screen font-outfit text-foreground bg-background antialiased",
          outfit.variable
        )}
        suppressHydrationWarning={true}
      >
        <main>
          <NextAuthProvider>
            <TanstackProvider>
              <Providers
                themeProps={{ attribute: "class", defaultTheme: "light" }}
              >
                <ReduxProvider>
                  <ToastProvider>
                    <HistorySync />
                    <TurboSearchRouterBridge />
                    {children}
                    <ToastContainer />
                  </ToastProvider>
                </ReduxProvider>
              </Providers>
            </TanstackProvider>
          </NextAuthProvider>
        </main>

        {/* Hotwire Component Call */}
        <HotwireAppToastComponent />

        {/* Hotwire History Sync Component */}
        <HotwireAppHistorySyncComponent />

        {/*  Hotwire Theme Mode Component */}
        <HotwireAppThemeModeComponent />

        {/* Hotwire App Dynamic Button Cart Count */}
        <HotwireAppDynamicButtonCartCountComponent />
      </body>
    </html>
  );
}
