import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? "/Itzfizz-Digital" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
