import type { FastifyReply, FastifyRequest } from 'fastify';
import { checkDbConnectivity } from '../../lib/db';

const getHealth = async (req: FastifyRequest, res: FastifyReply) => {
  const dbConnection = await checkDbConnectivity();
  if (!dbConnection) {
    return res.status(503);
  }
  return 'OK';
};

export default getHealth;