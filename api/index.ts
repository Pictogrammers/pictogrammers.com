import fastify from 'fastify';
import oauthPlugin from '@fastify/oauth2';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import registerRoutes from './routes';

const server = fastify();
server.register(oauthPlugin as any, {
  callbackUri: 'http://localhost:8080/login/github/callback',
  credentials: {
    auth: oauthPlugin.GITHUB_CONFIGURATION,
    client: {
      id: process.env['GITHUB_CLIENT_ID'],
      secret: process.env['GITHUB_CLIENT_SECRET']
    }
  },
  name: 'githubOAuth2',
  scope: 'user:email',
  startRedirectPath: '/login/github'
});

registerRoutes(server);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
