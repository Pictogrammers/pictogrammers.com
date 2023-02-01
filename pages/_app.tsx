import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { Manrope } from '@next/font/google';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import { AnalyticsProvider } from 'use-analytics';
import { PaletteColorOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { DataProvider } from '../providers/DataProvider';
import Layout from '../components/Layout/Layout';
import CookieConsent from '../components/CookieConsent/CookieConsent';

import themeVars from '../styles/theme.module.scss';
import '../styles/defaults.scss';
import '../components/CarbonAd/Carbon.scss';

const manrope = Manrope({ subsets: ['latin'] });

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Palette {
    neutral: PaletteColorOptions;
    white: PaletteColorOptions;
  }
  // eslint-disable-next-line no-unused-vars
  interface PaletteOptions {
    neutral: PaletteColorOptions;
    white: PaletteColorOptions;
  }
}

const { palette } = createTheme();
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            color: '#fff'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          lineHeight: 2
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          fontFamily: manrope.style.fontFamily
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: 'black'
        },
        tooltip: {
          backgroundColor: 'black',
          fontSize: '.8rem',
          textAlign: 'center'
        }
      }
    }
  },
  palette: {
    neutral: palette.augmentColor({ color: { main: themeVars['neutral-color'] } }),
    primary: {
      contrastText: '#fff',
      main: themeVars['primary-color']
    },
    secondary: {
      main: themeVars['secondary-color']
    },
    success: {
      main: '#2D6430'
    },
    white: palette.augmentColor({ color: { main: '#fff' } })
  },
  typography: {
    fontFamily: manrope.style.fontFamily
  }
});

const Pictogrammers = ({ Component, pageProps }: AppProps) => {
  const { publicRuntimeConfig: { analytics } } = getConfig();
  const analyticsInstance = Analytics({
    app: 'Pictogrammers',
    debug: process?.env?.NODE_ENV === 'development',
    plugins: [
      googleAnalytics({
        enabled: false,
        measurementIds: [ analytics.googleTrackingId ]
      })
    ]
  });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Pictogrammers - Open-source iconography for designers and developers</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
        <meta content='Pictogrammers' name='title' key='title' />
        <meta content='Open-source iconography for designers and developers' name='description' key='description' />
        <meta content='en_US' property='og:locale' key='og:locale' />
        <meta content='Pictogrammers' property='og:title' key='og:title' />
        <meta content='website' property='og:type' key='og:type' />
        <meta content='https://pictogrammers.com/' property='og:url' key='og:url' />
        <meta content='Open-source iconography for designers and developers' property='og:description' key='og:description' />
        <meta content='/images/og-card.png' property='og:image' key='og:image' />
        <meta content='630' property='og:image:height' key='og:image:height' />
        <meta content='1200' property='og:image:width' key='og:image:width' />
        <meta content='summary' name='twitter:card' key='twitter:card' />
        <meta content='@pictogrammers' name='twitter:creator' key='twitter:creator' />
        <meta content='@pictogrammers' name='twitter:site' key='twitter:site' />
        <meta content='Pictogrammers' name='twitter:title' key='twitter:title' />
        <meta content='Open-source iconography for designers and developers' name='twitter:description' key='twitter:description' />
        <meta content='/images/twitter-card.png' name='twitter:image' key='twitter:image' />
      </Head>
      <AnalyticsProvider instance={analyticsInstance}>
        <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <DataProvider>
            <CookieConsent />
            <Layout className={manrope.className}>
              <Component {...pageProps} />
            </Layout>
          </DataProvider>
        </SnackbarProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
};

export default Pictogrammers;
