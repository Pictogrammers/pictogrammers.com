import type { FastifyRequest } from 'fastify';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';

const getSession = async (req: FastifyRequest) => {
  const isAuthed = req.session.authenticated;
  if (!isAuthed) {
    return { auth: false };
  }

  if (!req.session.user) {
    try {
      console.log('HERE', req.session.github);
      req.session.user = await getUserRecordByGitHubId(req.session.github.id);
    } catch (err) {
      console.log('HERE', err);
      await req.session.destroy();
      return { auth: false, error: 'contributorNotFound' };
    }
  }

  return {
    auth: req.session.authenticated,
    github: req.session.github,
    user: req.session.user
  };
};

export default getSession;