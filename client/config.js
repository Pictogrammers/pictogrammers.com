const fs = require('fs');
const { join } = require('path');
const { mdiBookOpenPageVariantOutline, mdiCodeTags, mdiFormatListNumbered, mdiPackageVariant, mdiRocketLaunch } = require('@mdi/js');

const getLibraryVersion = (packageName) => {
  const { version: libraryVersion } = JSON.parse(fs.readFileSync(join(process.cwd(), `../node_modules/${packageName}/package.json`), 'utf-8'));
  return libraryVersion;
};

module.exports = {
  analytics: {
    consentCookie: 'pg-analytics-consent',
    consentCookieExpiration: 182,
    googleTrackingId: 'G-0Y6PK9LKLT'
  },
  apiBase: `https://${process.env.NODE_ENV !== 'production' ? 'dev-' : ''}api.pictogrammers.com`,
  carbonAds: {
    placement: 'pictogrammerscom',
    serve: 'CWYD42QY'
  },
  docs: {
    categories: [
      {
        description: 'New? Learn how to get started quickly!',
        icon: mdiRocketLaunch,
        id: 'getting-started',
        name: 'Getting Started'
      },
      {
        description: 'Learn more about the Pictogrammers, our licenses, and more.',
        icon: mdiBookOpenPageVariantOutline,
        id: 'general',
        name: 'General'
      },
      {
        description: 'Looking for more advanced use cases? We\'ve written some guides for the more common ones.',
        icon: mdiFormatListNumbered,
        id: 'guides',
        name: 'Guides'
      },
      {
        description: 'We want you to help us improve! Learn how you can make a big impact.',
        icon: mdiCodeTags,
        id: 'contribute',
        name: 'Contribute'
      },
      {
        description: 'More detailed information about our releases, changelogs, and upgrade paths can be found here.',
        icon: mdiPackageVariant,
        id: 'releases',
        name: 'Releases'
      }
    ]
  },
  libraries: {
    fonts: [
      // TODO: Support fonts
      {
        font: 'https://raw.githubusercontent.com/Pictogrammers/Jun/main/JunMono.otf',
        id: 'jun-mono',
        name: 'Jun Mono',
        packageId: '08c8f6ed-3c55-11ed-8ca4-1209440c2141',
        unreleased: true
      },
      {
        font: 'https://raw.githubusercontent.com/Pictogrammers/Jun/main/JunSans.otf',
        id: 'jun-sans',
        name: 'Jun Sans',
        packageId: 'aa662e27-45cb-11ed-a513-1209440c2141',
        unreleased: true
      }
    ],
    icons: [
      {
        description: 'The original. Following Google\'s Material Design guidelines for system icons, MDI is our largest library, touting over 7200 unique icons!',
        exampleTypes: [ 'react', 'vue', 'home-assistant', 'webfont' ],
        featured: true,
        git: 'https://github.com/Templarian/MaterialDesign',
        gridSize: 24,
        id: 'mdi',
        image: 'images/libraries/mdi.svg',
        jsPackage: '@mdi/js',
        name: 'Material Design Icons',
        package: '@mdi/svg',
        packageId: '38EF63D0-4744-11E4-B3CF-842B2B6CFE1B',
        shortName: 'MDI',
        version: getLibraryVersion('@mdi/svg')
      },
      {
        description: 'Taking a lighter spin on Google\'s Material Design guidelines, MDI Light slims down icons to be modern, crisp, and clean.',
        exampleTypes: [ 'react', 'vue', 'webfont' ],
        featured: true,
        git: 'https://github.com/Pictogrammers/MaterialDesignLight',
        gridSize: 24,
        id: 'mdil',
        image: 'images/libraries/mdil.svg',
        jsPackage: '@mdi/light-js',
        name: 'Material Design Icons Light',
        package: '@mdi/light-svg',
        packageId: '531A9B44-1962-11E5-89CC-842B2B6CFE1B',
        shortName: 'MDI Light',
        version: getLibraryVersion('@mdi/light-svg')
      },
      {
        description: 'The Memory icon set contains 22x22 pixelated icons. Ideal for the Sharp Memory 2.7" Display.',
        exampleTypes: [ 'react', 'vue' ],
        git: 'https://github.com/Pictogrammers/Memory',
        gridSize: 22,
        id: 'memory',
        image: 'images/libraries/memory.svg',
        jsPackage: '@pictogrammers/memory',
        name: 'Memory Icons',
        package: '@pictogrammers/memory-svg',
        packageId: '2764ae46-20c1-11ed-8ca4-1209440c2141',
        shortName: 'Memory',
        version: getLibraryVersion('@pictogrammers/memory-svg')
      }
    ]
  },
  sessionCookieName: `pg-${process.env.NODE_ENV !== 'production' ? 'dev-' : ''}session`
};
