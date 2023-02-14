import type { FastifyRequest } from 'fastify';

const getSession = async (req: FastifyRequest) => {
  return {
    contributor: req.session.contributor,
    github: req.session.github
  };
};

export default getSession;