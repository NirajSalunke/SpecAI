import path from "node:path"
import type { NextConfig } from "next"

const monorepoRoot = path.resolve(process.cwd(), "../..")

const isDockerBuild = process.env.BUILD_STANDALONE === "true";

const nextConfig: NextConfig = {
  ...(isDockerBuild ? { output: "standalone" as const } : {}),
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@workspace/ui"],
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig
