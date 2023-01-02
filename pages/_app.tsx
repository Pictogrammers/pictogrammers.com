import { AppProps } from 'next/app';
import Head from 'next/head';
import { Manrope } from '@next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import Layout from '../components/Layout/Layout';

import themeVars from '../styles/theme.module.scss';
import '../styles/defaults.scss';

const manrope = Manrope({ subsets: ['latin'] });
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
          backgroundColor: 'black'
        }
      }
    }
  },
  palette: {
    primary: {
      contrastText: '#fff',
      main: themeVars['primary-color']
    },
    secondary: {
      main: themeVars['secondary-color']
    }
  },
  typography: {
    fontFamily: manrope.style.fontFamily
  }
});

const Pictogrammers = ({ Component, pageProps }: AppProps) => {
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
        <meta content='/og-card.png' property='og:image' key='og:image' />
        <meta content='630' property='og:image:height' key='og:image:height' />
        <meta content='1200' property='og:image:width' key='og:image:width' />
        <meta content='summary' name='twitter:card' key='twitter:card' />
        <meta content='@pictogrammers' name='twitter:creator' key='twitter:creator' />
        <meta content='@pictogrammers' name='twitter:site' key='twitter:site' />
        <meta content='Pictogrammers' name='twitter:title' key='twitter:title' />
        <meta content='Open-source iconography for designers and developers' name='twitter:description' key='twitter:description' />
        <meta content='twitter-card.png' name='twitter:image' key='twitter:image' />
      </Head>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Layout className={manrope.className}>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Pictogrammers;
