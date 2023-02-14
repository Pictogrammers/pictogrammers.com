/* eslint-disable no-unused-vars */
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }

  interface Session {
    contributor: object;
    github: {
      avatar: string;
      email: string;
      id: string;
      name: string;
    }
  }
}
