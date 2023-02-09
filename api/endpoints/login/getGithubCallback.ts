import { Octokit } from '@octokit/rest';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import config from '../../config';

const getGithubCallback = (server: FastifyInstance) => async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token } = await server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const octokit = new Octokit({ auth: token.access_token });
    const { data } = await octokit.request('/user');

    req.session.authenticated = true;
    req.session.user = data;
    res.redirect(`${config.siteBase}/admin`);
  } catch (err) {
    res.status(401);
  }
};

export default getGithubCallback;