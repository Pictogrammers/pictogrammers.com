import fastify from 'fastify';

import getHealth from './endpoints/getHealth';

const server = fastify();

server.get('/health', getHealth);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
