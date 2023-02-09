import type { FastifyInstance } from 'fastify';

import getGithubCallback from './endpoints/login/getGithubCallback';
import getContributors from './endpoints/contributors/getContributors';
import getContributorById from './endpoints/contributors/getContributorById';

const registerRoutes = (server: FastifyInstance) => {
  // General Endpoints
  server.get('/', (req, res) => res.redirect('https://pictogrammers.com/'));
  server.get('/health', () => 'OK');

  // Authentication Endpoints
  server.get('/login/github/callback', getGithubCallback(server));

  // Contributor Endpoints
  server.get('/contributors', getContributors);
  server.get('/contributors/:contributorId', getContributorById);
};

export default registerRoutes;