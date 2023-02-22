/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: [
    '/403',
    '/login',
    '/admin',
    '/admin/*'
  ],
  generateRobotsTxt: true,
  outDir: 'dist',
  siteUrl: 'https://pictogrammers.com'
};
