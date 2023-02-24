import type { FastifyReply, FastifyRequest } from 'fastify';

import getUserRecordByGitHubId from '../../model/user/getUserRecordByGitHubId';

type UserRequest = FastifyRequest<{
  Params: {
    userGitHubId: string;
  }
}>

const getUserByGitHubId = async (req: UserRequest, res: FastifyReply) => {
  const { userGitHubId } = req.params;

  try {
    return getUserRecordByGitHubId(userGitHubId);
  } catch (err: any) {
    return res.code(err.statusCode || 500).send(err);
  }
};

export default getUserByGitHubId;