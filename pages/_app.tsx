import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

import { MdxComponentsProvider } from '../context/mdxContext';

import Layout from '../components/Layout/Layout';

import OpenGraphImage from '../assets/og-card.png';
import TwitterImage from '../assets/twitter-card.png';

import '../styles/defaults.scss';

import themeVars from '../styles/theme.module.scss';
const theme = createTheme({
  palette: {
    primary: {
      contrastText: 'white',
      main: themeVars['primary-color']
    },
    secondary: {
      main: themeVars['secondary-color']
    }
  },
  typography: {
    fontFamily: themeVars['primary-font']
  }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Pictogrammers - Open-source iconography for designers and developers</title>
        <meta content='Pictogrammers' name='title' />
        <meta content='Open-source iconography for designers and developers' name='description' />
        <meta content='Pictogrammers Icon Group' property='og:title' />
        <meta content='website' property='og:type' />
        <meta content='https://pictogrammers.com/' property='og:url' />
        <meta content='Open-source iconography for designers and developers' property='og:description' />
        <meta content={OpenGraphImage.src} property='og:image' />
        <meta content='summary' name='twitter:card' />
        <meta content='@pictogrammers' name='twitter:creator' />
        <meta content='@pictogrammers' name='twitter:site' />
        <meta content='Pictogrammers Icon Group' name='twitter:title' />
        <meta content='Open-source iconography for designers and developers' name='twitter:description' />
        <meta content={TwitterImage.src} name='twitter:image' />
      </Helmet>
      <MdxComponentsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MdxComponentsProvider>
    </ThemeProvider>
  );
};
