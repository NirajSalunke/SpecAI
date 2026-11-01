import path from "node:path"
import type { NextConfig } from "next"

const monorepoRoot = path.resolve(process.cwd(), "../..")

const nextConfig: NextConfig = {
  output: "standalone",

  outputFileTracingRoot: monorepoRoot,

  transpilePackages: ["@workspace/ui"],

  turbopack: {
    root: monorepoRoot,
  },
}

export default nextConfig
