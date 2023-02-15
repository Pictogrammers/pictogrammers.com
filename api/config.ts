const isProd = process.env['NODE_ENV'] === 'production';

const config = {
  apiBase: `https://${!isProd ? 'dev-' : ''}api.pictogrammers.com`,
  cookieName: `pg-${!isProd ? 'dev-' : ''}session`,
  domain: 'pictogrammers.com',
  siteBase: `https://${!isProd ? 'dev.' : ''}pictogrammers.com`
};

export default config;