import { Octokit } from '@octokit/rest';
import type { FastifyInstance, FastifyRequest } from 'fastify';

const getGithubCallback = (server: FastifyInstance) => async (req: FastifyRequest) => {
  const { token } = await server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  const octokit = new Octokit({ auth: token.access_token });
  const { data } = await octokit.request('/user');
  return data;
};

export default getGithubCallback;