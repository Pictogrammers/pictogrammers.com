import type { FastifyReply, FastifyRequest } from 'fastify';

import getUserRecordById from '../../model/user/getUserRecordById';

type ContributorRequest = FastifyRequest<{
  Params: {
    contributorId: string;
  }
}>

const getContributorById = async (req: ContributorRequest, res: FastifyReply) => {
  const { contributorId } = req.params;

  try {
    return getUserRecordById(contributorId);
  } catch (err: any) {
    return res.code(err.statusCode || 500).send(err);
  }
};

export default getContributorById;