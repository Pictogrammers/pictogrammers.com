import fastify from 'fastify';
import oauthPlugin from '@fastify/oauth2';
import cookiePlugin from '@fastify/cookie';
import sessionPlugin from '@fastify/session';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import config from './config';
import registerRoutes from './routes';

const server = fastify();
server.register(cookiePlugin);
server.register(sessionPlugin, {
  cookie: {
    secure: process.env['NODE_ENV'] === 'production'
  },
  cookieName: 'sessionId',
  secret: process.env['COOKIE_SECRET'] || 'the-development-super-secret-key'
});
server.register(oauthPlugin as any, {
  callbackUri: `${config.apiBase}/login/github/callback`,
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
