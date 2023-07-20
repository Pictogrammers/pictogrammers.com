const path = require('path');
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
  distDir: 'dist',
  env: {
    nextImageExportOptimizer_exportFolderPath: 'dist',
    nextImageExportOptimizer_generateAndUseBlurImages: false,
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true
  },
  eslint: {
    dirs: ['components', 'hooks', 'interfaces', 'pages', 'providers', 'scripts', 'types', 'utils', 'workers']
  },
  images: process.env.NODE_ENV === 'production' ? {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'custom'
  } : {
    unoptimized: true
  },
  output: 'export',
  publicRuntimeConfig: config,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ],
    prependData: '@import "variables.scss";'
  },
  swcMinify: true,
  trailingSlash: true,
  transpilePackages: [
    'next-image-export-optimizer',
    'pixel-editor'
  ],
  webpack(config) {
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
                    cleanupIds: false,
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

module.exports = withBA(withPWA(nextConfig));
