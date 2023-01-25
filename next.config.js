const path = require('path');
const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');
const withTM = require('next-transpile-modules')(['pixel-editor']);
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
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
    
    // Pre-compress assets with Brotli in production
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
        algorithm: 'brotliCompress',
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        deleteOriginalAssets: false,
        filename: '[path][base].br',
        minRatio: 0.8,
        test: /\.(js|css|html|svg)$/
      }));
    }

    return config;
  }
};

module.exports = withBA(withTM(withPWA(nextConfig)));
