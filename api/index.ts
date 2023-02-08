import fastify from 'fastify';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import getContributors from './endpoints/contributors/getContributors';
import getContributorById from './endpoints/contributors/getContributorById';

const server = fastify();

// General Endpoints
server.get('/', (req, res) => res.redirect('https://pictogrammers.com/'));
server.get('/health', () => 'OK');

// Contributor Endpoints
server.get('/contributors', getContributors);
server.get('/contributors/:contributorId', getContributorById);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
