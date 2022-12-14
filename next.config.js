const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
});

const nextConfig = {
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { isServer }) {
    // if (isServer) {
    require('./scripts/getContributors');
    // }

    config.module.rules.push({
      issuer: { and: [/\.(js|ts)x?$/] },
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          // TODO: Reenable this and figure out how to disable group stripping
          svgo: false
        }
      }]
    });
    
    return config;
  }
};

module.exports = withPWA(nextConfig);
