/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@mikrommerce/api",
    "@mikrommerce/auth",
    "@mikrommerce/db",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default config;
