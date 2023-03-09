import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { graphql } from '@octokit/graphql';
import type { GraphQlQueryResponseData } from '@octokit/graphql';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';
import addUserRecord from '../../model/user/addUserRecord';

import config from '../../config';

const getGithubCallback = (server: FastifyInstance) => async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token } = await server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const { viewer } = await graphql('{ viewer { avatarUrl, email, hasSponsorsListing, login, name } }', {
      headers: {
        authorization: `token ${token.access_token}`
      }
    }) as GraphQlQueryResponseData;

    req.session.github = viewer;

    try {
      req.session.user = await getUserRecordByGitHubId(viewer.login);
    } catch (err) {
      // If we have never seen this user, we need to create a user record for them
      await addUserRecord({
        email: viewer.email,
        github: viewer.login,
        name: viewer.name
      });
      req.session.user = await getUserRecordByGitHubId(viewer.login);
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