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
  env: {
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_generateAndUseBlurImages: false,
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true
  },
  images: process.env.NODE_ENV === 'production' ? {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'custom'
  } : {
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
  transpilePackages: ['next-image-export-optimizer'],
  webpack(config, { isServer }) {
    config.module.rules.push({
      issuer: {
        and: [/\.(js|ts)x?$/]
      },
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // These are all required for the special
                    // animations on the Pictogrammers monogram
                    // and the mobile hamburger menu.
                    cleanupIDs: false,
                    collapseGroups: false,
                    mergePaths: false
                  }
                }
              }
            ]
          }
        }
      }]
    });
    
    return config;
  }
};

module.exports = withBA(withTM(withPWA(nextConfig)));
