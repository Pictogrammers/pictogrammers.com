import type { FastifyInstance } from 'fastify';

import config from './config';
import getSession from './endpoints/auth/getSession';
import getGithubCallback from './endpoints/auth/getGithubCallback';
import getLogout from './endpoints/auth/getLogout';
import getContributors from './endpoints/contributors/getContributors';
import getContributorByGitHubId from './endpoints/contributors/getContributorByGitHubId';

const registerRoutes = (server: FastifyInstance) => {
  // General Endpoints
  server.get('/', (req, res) => res.redirect(config.siteBase));
  server.get('/health', () => 'OK');

  // Authentication Endpoints
  server.get('/auth/session', getSession);
  server.get('/auth/github/callback', getGithubCallback(server));
  server.get('/auth/logout', getLogout);

  // Contributor Endpoints
  server.get('/contributors', getContributors);
  server.get('/contributors/:contributorGitHubId', getContributorByGitHubId);
};

export default registerRoutes;