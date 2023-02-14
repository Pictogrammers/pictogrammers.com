import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Octokit } from '@octokit/rest';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';

import config from '../../config';

const getGithubCallback = (server: FastifyInstance) => async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token } = await server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const octokit = new Octokit({ auth: token.access_token });
    const { data } = await octokit.request('/user');

    req.session.github = {
      avatar: data.avatar_url,
      email: data.email,
      id: data.login,
      name: data.name
    };

    try {
      req.session.contributor = await getUserRecordByGitHubId(req.session.github.id);
    } catch (err) {
      // We let anyone log in to use some personalization features of the site,
      // so if they're not a contributor, we just don't include that information.
    }

    const redirectPath = req.cookies['pg-login-redirect'] || '/';
    res
      .clearCookie('pg-login-redirect')
      .redirect(`${config.siteBase}${redirectPath}`);
  } catch (err) {
    console.error(err);
    res.status(401);
  }
};

export default getGithubCallback;