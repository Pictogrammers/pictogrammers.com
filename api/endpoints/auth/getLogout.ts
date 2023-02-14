import type { FastifyReply, FastifyRequest } from 'fastify';

import config from '../../config';

type LogoutRequest = FastifyRequest<{
  Querystring: {
    redirect: string;
  }
}>

const getLogout = async (req: LogoutRequest, res: FastifyReply) => {
  await req.session.destroy();

  if (req?.query?.redirect) {
    res.redirect(config.siteBase);
    return;
  }

  res.status(200);
};

export default getLogout;