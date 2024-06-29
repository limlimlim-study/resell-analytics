module.exports = {
  apps: [
    {
      name: 'kream-scrap-api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
