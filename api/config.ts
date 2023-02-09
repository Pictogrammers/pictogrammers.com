const isProd = process.env['NODE_ENV'] === 'production';

const config = {
  apiBase: isProd ? 'https://api.pictogrammers.com' : 'http://localhost:8080',
  siteBase: isProd ? 'https://pictogrammers.com' : 'http://localhost:3000'
};

export default config;