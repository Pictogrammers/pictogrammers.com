import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { graphql } from '@octokit/graphql';
import type { GraphQlQueryResponseData } from '@octokit/graphql';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';

import config from '../../config';

const getGithubCallback = (server: FastifyInstance) => async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token } = await server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const { viewer } = await graphql(
      `{
        viewer { 
          avatarUrl,
          email,
          hasSponsorsListing,
          login,
          name
        }
      }`,
      {
        headers: {
          authorization: `token ${token.access_token}`
        }
      }
    ) as GraphQlQueryResponseData;

    req.session.github = viewer;

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