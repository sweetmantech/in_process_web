/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@walletconnect/ethereum-provider",
    "thread-stream",
    "pino",
    "@ardrive/turbo-sdk",
    "isomorphic-dompurify",
  ],
  images: {
    loader: "custom",
    loaderFile: "./lib/media/imageLoader.ts",
  },
  turbopack: {
    resolveAlias: {
      buffer: { browser: "buffer/" },
      crypto: { browser: "crypto-browserify" },
      stream: { browser: "stream-browserify" },
      process: { browser: "process/browser" },
      async_hooks: { browser: "./lib/wayfinder/async-hooks-stub.js" },
      "@opentelemetry/context-zone": {
        browser: "@opentelemetry/context-zone",
        default: "./lib/wayfinder/context-zone-stub.js",
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        process: require.resolve("process/browser"),
        async_hooks: false,
      };
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@opentelemetry/context-zone": require.resolve("./lib/wayfinder/context-zone-stub.js"),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
