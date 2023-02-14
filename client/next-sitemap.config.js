/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: [ '/admin/*' ],
  generateRobotsTxt: true,
  outDir: 'dist',
  siteUrl: 'https://pictogrammers.com'
};
