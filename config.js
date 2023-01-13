const { mdiBookOpenPageVariantOutline, mdiCodeTags, mdiFormatListNumbered, mdiPackageVariant, mdiRocketLaunch } = require('@mdi/js');

module.exports = {
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
        description: 'The original. Following Google\'s Material Design guidelines for system icons, MDI is our largest library, touting over 6500 unique icons!',
        exampleTypes: [ 'react', 'vue', 'home-assistant', 'webfont' ],
        featured: true,
        git: 'https://github.com/Templarian/MaterialDesign',
        gridSize: 24,
        id: 'mdi',
        image: 'assets/libraries/mdi.svg',
        name: 'Material Design Icons',
        package: '@mdi/svg',
        packageId: '38EF63D0-4744-11E4-B3CF-842B2B6CFE1B',
        shortName: 'MDI'
      },
      {
        description: 'Taking a lighter spin on Google\'s Material Design guidelines, MDI Light slims down icons to be modern, crisp, and clean.',
        exampleTypes: [ 'react', 'vue', 'webfont' ],
        featured: true,
        git: 'https://github.com/Templarian/MaterialDesignLight',
        gridSize: 24,
        id: 'mdil',
        image: 'assets/libraries/mdil.svg',
        name: 'Material Design Icons Light',
        package: '@mdi/light-svg',
        packageId: '531A9B44-1962-11E5-89CC-842B2B6CFE1B',
        shortName: 'MDI Light'
      },
      {
        git: 'https://github.com/Pictogrammers/Memory',
        gridSize: 22,
        id: 'memory',
        image: 'assets/libraries/memory.svg',
        name: 'Memory Icons',
        package: '@pictogrammers/memory',
        packageId: '2764ae46-20c1-11ed-8ca4-1209440c2141',
        shortName: 'Memory',
        unreleased: true
      }
    ]
  }
};
