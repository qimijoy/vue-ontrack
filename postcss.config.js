export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    doiuse: {
      onFeatureUsage(usageInfo) {
        console.log(usageInfo.message);
      },
    },
    cssnano: {
      preset: 'default',
    },
  },
};
