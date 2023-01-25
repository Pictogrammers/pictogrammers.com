const path = require('path');
const withTM = require('next-transpile-modules')(['pixel-editor']);
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  // Don't register an offline service worker to avoid lots of extra HTTP requests
  register: false
});
const withBA = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const config = require('./config');

const nextConfig = {
  images: {
    unoptimized: true
  },
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
  trailingSlash: true,
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

module.exports = withBA(withTM(withPWA(nextConfig)));
