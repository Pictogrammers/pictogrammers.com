import type { FastifyRequest } from 'fastify';

const getSession = async (req: FastifyRequest) => {
  console.log(req.session);
};

export default getSession;