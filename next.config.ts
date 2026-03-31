import { configHeader } from "@/utils/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT
        ? (() => {
            try {
              const url = new URL(process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT);
              return [
                {
                  protocol: url.protocol.replace(":", "") as "https" | "http",
                  hostname: url.hostname,
                },
              ];
            } catch {
              console.warn(
                "Invalid NEXT_PUBLIC_BAGISTO_ENDPOINT URL:",
                process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT,
              );
              return [];
            }
          })()
        : []),
    ],
  },
  async headers() {
    return configHeader;
  },
  compress: true,
  experimental: {
    optimizePackageImports: ["lodash", "date-fns"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
