import type { FastifyReply, FastifyRequest } from 'fastify';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';

type ContributorRequest = FastifyRequest<{
  Params: {
    contributorGitHubId: string;
  }
}>

const getContributorByGitHubId = async (req: ContributorRequest, res: FastifyReply) => {
  const { contributorGitHubId } = req.params;

  try {
    return getUserRecordByGitHubId(contributorGitHubId);
  } catch (err: any) {
    return res.code(err.statusCode || 500).send(err);
  }
};

export default getContributorByGitHubId;