import type { FastifyRequest } from 'fastify';

import getUserRecords from '../../model/user/getUserRecords';

type UserRequest = FastifyRequest<{
  Querystring: {
    contributors: string;
  }
}>

const getUsers = async (req: UserRequest) => {
  const { contributors } = req.query;
  const contributorsOnly = contributors === 'true';
  return getUserRecords(contributorsOnly);
};

export default getUsers;