/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/DzjCwcwW/race-Track.webp",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/zm6cRTt/gokart-R.png",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/*/katpcha-me-*.webp",
        port: "",
      },
    ],
  },
  /**
   * You can configure the logging level and whether the full URL is logged to
   * the console when running Next.js in development mode.
   *
   * Currently, logging only applies to data fetching using the fetch API. It
   * does not yet apply to other logs inside of Next.js.
   */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
  },

  // output: "standalone",
  // experimental: {
  //   turbotrace: {
  //     // control the log level of the turbotrace, default is `error`
  //     logLevel: "bug",
  //     // | 'fatal'
  //     // | 'error'
  //     // | 'warning'
  //     // | 'hint'
  //     // | 'note'
  //     // | 'suggestions'
  //     // | 'info',
  //     // control if the log of turbotrace should contain the details of the analysis, default is `false`
  //     logDetail: true,
  //     // show all log messages without limit
  //     // turbotrace only show 1 log message for each categories by default
  //     logAll: true,
  //     // control the context directory of the turbotrace
  //     // files outside of the context directory will not be traced
  //     // set the `experimental.outputFileTracingRoot` has the same effect
  //     // if the `experimental.outputFileTracingRoot` and this option are both set, the `experimental.turbotrace.contextDirectory` will be used
  //     // contextDirectory?: string,
  //     // if there is `process.cwd()` expression in your code, you can set this option to tell `turbotrace` the value of `process.cwd()` while tracing.
  //     // for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
  //     // processCwd?: string,
  //     // control the maximum memory usage of the `turbotrace`, in `MB`, default is `6000`.
  //     // memoryLimit?: number,
  //   },
  // },
};

module.exports = nextConfig;
