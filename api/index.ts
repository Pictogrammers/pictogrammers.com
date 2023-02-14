import fastify from 'fastify';
import corsPlugin from '@fastify/cors';
import oauthPlugin from '@fastify/oauth2';
import cookiePlugin from '@fastify/cookie';
import sessionPlugin from '@fastify/session';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import config from './config';
import registerRoutes from './routes';

const server = fastify({
  logger: process.env['NODE_ENV'] !== 'production'
});

// CORS Handling
server.register(corsPlugin, {
  credentials: true,
  origin: [
    config.siteBase,
    'pictogrammers.github.io'
  ]
});

// Session & Cookie Handling
const FileStore = require('session-file-store')(sessionPlugin);
server.register(cookiePlugin);
server.register(sessionPlugin, {
  cookie: {
    domain: config.domain,
    httpOnly: false,
    maxAge: 86400000,
    secure: process.env['NODE_ENV'] === 'production'
  },
  cookieName: 'pg-session',
  saveUninitialized: false,
  secret: process.env['COOKIE_SECRET'] || 'the-development-super-secret-key',
  store: new FileStore()
});

// GitHub OAuth2 Handling
server.register(oauthPlugin as any, {
  callbackUri: `${config.apiBase}/auth/github/callback`,
  credentials: {
    auth: oauthPlugin.GITHUB_CONFIGURATION,
    client: {
      id: process.env['GITHUB_CLIENT_ID'],
      secret: process.env['GITHUB_CLIENT_SECRET']
    }
  },
  name: 'githubOAuth2',
  scope: 'user:email',
  startRedirectPath: '/auth/github'
});

// Register application routes
registerRoutes(server);

// Start the API server
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
