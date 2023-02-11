import type { FastifyReply, FastifyRequest } from 'fastify';

import config from '../../config';

const getLogout = async (req: FastifyRequest, res: FastifyReply) => {
  await req.session.destroy();
  res.redirect(`${config.siteBase}/admin`);
};

export default getLogout;