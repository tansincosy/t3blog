import path from "path";
import babelPluginMacros from "babel-plugin-macros";
import babelPluginStyld from "babel-plugin-styled-components"
import babelSyntaxTypescript from "@babel/plugin-syntax-typescript"
// The folders containing files importing twin.macro

function getIncludedDirs() {
  return [
    path.resolve("src","components"),
    path.resolve("src","pages"),
    path.resolve("src","styles"),
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
                babelPluginMacros,
                [
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  babelPluginStyld,
                  { ssr: true, displayName: true },
                ],
                [
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  babelSyntaxTypescript,
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
