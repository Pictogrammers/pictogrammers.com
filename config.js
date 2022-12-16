const ReactDOMServer = require('react-dom/server');

module.exports = {
  libraries: {
    fonts: [
      // TODO: Support fonts
      // {
      //   font: 'https://raw.githubusercontent.com/Pictogrammers/Jun/main/JunMono.otf',
      //   name: 'Jun Mono'
      // }
    ],
    icons: [
      {
        description: 'The original. Following Google\'s Material Design guidelines for system icons, MDI is our largest library, touting over 6500 unique icons!',
        id: 'mdi',
        image: 'assets/libraries/mdi.svg',
        name: 'Material Design Icons',
        package: '@mdi/svg'
      },
      {
        description: 'Taking a lighter spin on Google\'s Material Design guidelines, MDI Light slims down icons to be modern, crisp, and clean.',
        id: 'mdil',
        image: 'assets/libraries/mdil.svg',
        name: 'Material Design Icons Light',
        package: '@mdi/light-svg'
      },
      // TODO: Memory meta.json and SVG package don't exist yet
      // {
      //   id: 'memory',
      //   package: '@pictogrammers/memory'
      // }
    ]
  }
};
