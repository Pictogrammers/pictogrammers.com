import type { FastifyInstance } from 'fastify';

import config from './config';
import getSession from './endpoints/auth/getSession';
import getGithubCallback from './endpoints/auth/getGithubCallback';
import getLogout from './endpoints/auth/getLogout';
import getUsers from './endpoints/users/getUsers';
import getUserByGitHubId from './endpoints/users/getUserByGitHubId';

const registerRoutes = (server: FastifyInstance) => {
  // General Endpoints
  server.get('/', (req, res) => res.redirect(config.siteBase));
  server.get('/health', () => 'OK');

  // Authentication Endpoints
  server.get('/auth/session', getSession);
  server.get('/auth/github/callback', getGithubCallback(server));
  server.get('/auth/logout', getLogout);

  // User Endpoints
  server.get('/users', getUsers);
  server.get('/users/:userGitHubId', getUserByGitHubId);
};

export default registerRoutes;