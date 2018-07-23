module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/**.js',
    'index.html',
    'css/*.css',
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js',
};
