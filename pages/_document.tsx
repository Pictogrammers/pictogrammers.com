import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='application-name' content='Pictogrammers' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Pictogrammers' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='none' />
        <meta name='msapplication-TileColor' content='#258dad' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#258dad' />
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png'></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
