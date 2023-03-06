import path from "path";

// The folders containing files importing twin.macro

function getIncludedDirs() {
  return [
    path.resolve("components"),
    path.resolve("pages"),
    path.resolve("styles"),
  ];
}

/**
 * @param {import("next").NextConfig} nextConfig
 */
export function withTwin(nextConfig) {
  return {
    ...nextConfig,
    /**
     * @param {{ module: { rules?: any; }; resolve: { fallback: any; }; }} config
     * @param {import("next/dist/server/config-shared").WebpackConfigContext} options
     */
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: getIncludedDirs(),
        use: [
          options.defaultLoaders.babel,
          {
            loader: "babel-loader",
            options: {
              sourceMaps: dev,
              plugins: [
                import("babel-plugin-macros"),
                [
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  import("babel-plugin-styled-components"),
                  { ssr: true, displayName: true },
                ],
                [
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  import("@babel/plugin-syntax-typescript"),
                  { isTSX: true },
                ],
              ],
            },
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
}
