module.exports = {
  // other configuration here
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "fs": false // If there's no browser-friendly polyfill for this, we can set it to false
    },
  },
};