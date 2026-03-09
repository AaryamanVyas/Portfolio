import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Prevent Next from inferring the wrong monorepo root.
    root: __dirname,
  },
};

export default nextConfig;
