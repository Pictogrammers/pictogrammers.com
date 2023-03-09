/* eslint-disable no-unused-vars */
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }

  interface Session {
    github: {
      avatarUrl: string;
      email: string;
      hasSponsorsListing: boolean;
      login: string;
      name: string;
    },
    user: object;
  }
}
