const path = require('path');
const config = require('./config');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
});

const nextConfig = {
  // images: {
  //   unoptimized: true
  // },
  publicRuntimeConfig: config,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: '/libraries',
        permanent: true,
        source: '/library'
      },
      {
        destination: '/library/:libraryId',
        permanent: true,
        source: '/library/:libraryId/(author|category|icon|version)'
      }
    ];
  },
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ],
    prependData: '@import "variables.scss";'
  },
  swcMinify: true,
  webpack(config, { isServer }) {
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
