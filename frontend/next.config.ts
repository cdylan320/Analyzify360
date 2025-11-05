import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Webpack config (used for production builds, ignored when using Turbopack)
  // Optional Web3 dependencies are handled at runtime with try-catch blocks
  webpack: (config) => {
    // Suppress warnings for optional Web3 dependencies in production builds
    // These modules are handled conditionally at runtime
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /@tanstack\/react-query/ },
      { module: /wagmi/ },
      { module: /@web3modal/ },
      { module: /viem/ },
    ];
    
    return config;
  },
};

export default nextConfig;
