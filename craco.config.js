const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#0057B7",
              "@layout-header-background": "#0057B7",
              "@font-family": '"DM Sans", sans-serif',
              "@primary-hover-color": "#D62D4C",
              "@btn-default-color": "#0057B7",
              "@btn-default-border": "#0057B7",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
