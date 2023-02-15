<h1 align="center">
  Pictogrammers.com
</h1>
<div align="center">
  <p>
    Built with <a href="https://nextjs.org/" target="_blank">Next.js</a>.
  </p>
   <p>
    <img src="./client/public/images/og-card.png" alt="Pictogrammers" />
  </p>
</div>

## Development

### Requirements

- Node.js v18+
- Docker

### Instructions

1. Clone this repository.
2. Generate your development certificates.
  - On Mac, run `npm run dev:certs`. You need [Homebrew](https://brew.sh/) to be installed.
  - On any other platform, see [Generating Dev Certs](#generating-dev-certs).
  - Once your certs are generated, you do not need to run this command again unless you delete the certs or they expire.
3. Run `npm i`.
4. Run `npm run dev` to start the dev servers.
  - Access the dev site at <https://dev.pictogrammers.com>.
  - Access the dev API at <https://dev-api.pictogrammers.com>.
  - The dev MySQL instance will come up at <http://localhost:3306>.

> The site and API will hot-reload as you make changes.

See <https://pictogrammers.com/docs/contribute/website/> for more details about contributing to the site.

### Generating Dev Certs

If you are not using a Mac, you will need to [follow the instructions on the `mkcert` GitHub page](https://github.com/FiloSottile/mkcert) to install the version for your platform.

You need to generate certs for the following two domains:

- `dev.pictogrammers.com`
- `dev-api.pictogrammers.com`

Place these certifications in the `.dev/certs` directory. Then start the application.

### Env variables

#### GitHub OAuth Client & Secret (Optional)

To test and debug any part of the site behind authentication, you will need to create a GitHub OAuth application and provide the Client ID and Secret in the environment file.

> This is not required to work on public facing areas of the site. You will be unable to log in/out or access areas of the site behind authentication.

1. Create a [GitHub OAuth App](https://github.com/settings/developers).
2. Use `https://dev-api.pictogrammers.com/auth/github/callback` as the "Authorization callback URL".
3. Create a `.env` file in the root of the repository.
4. Copy and paste your client ID and secret into the env file.
  ```text
  GITHUB_CLIENT_ID={YOUR_CLIENT_ID}
  GITHUB_CLIENT_SECRET={YOUR_CLIENT_SECRET}
  ```
5. Restart the dev server.

#### GitHub Access Token (Optional)

To test and debug contributor fetching, specifically around GitHub, you will need to be a member of the Pictogrammers organization and have a GitHub access token.

> This is not required to work on the site, information about GitHub code contributions just will not be available when working locally if you skip this.

1. Create a [GitHub personal access token](https://github.com/settings/tokens?type=beta).
2. Request access to the Pictogrammers organization with your token.
  - A core member will need to approve this, so it may take some time.
3. Create a `.env` file in the root of the repository.
4. Add `API_KEY_GITHUB` to the `.env` file with your token.
5. Restart the dev server.

### Code Quality

Before opening a PR with your changes, be sure to run `npm run lint` and correct any linting errors. These jobs will also run on the PR, informing you of failures that will need to be addressed before your PR can be merged.

### Building

> You shouldn't need to build locally. This information is provided for advanced troubleshooting cases.

1. Run `npm build` to build the site and API.
2. The built assets will be located in the following folders:
  - Client: `/client/dist`
  - API: `/api/dist`

## Legal

&copy; Copyright 2023 Pictogrammers.
