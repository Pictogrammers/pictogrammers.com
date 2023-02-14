import type { FastifyReply, FastifyRequest } from 'fastify';

const getLogout = async (req: FastifyRequest, res: FastifyReply) => {
  await req.session.destroy();
  res.status(200);
};

export default getLogout;