import type { FastifyRequest } from 'fastify';

const getSession = async (req: FastifyRequest) => {
  return {
    github: req.session.github,
    user: req.session.user
  };
};

export default getSession;