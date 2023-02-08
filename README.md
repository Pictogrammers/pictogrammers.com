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

### Instructions

1. Clone this repository.
2. Run `npm i`.
3. Run `npm run dev` to start the dev servers.
  - Access the dev client site at <http://localhost:3000>.
  - Access the dev API at <http://localhost:8080>.

> The site and API will hot-reload as you make changes.

See <https://pictogrammers.com/docs/contribute/website/> for more details about contributing to the site.

### Env variables

To test and debug contributor fetching, specifically around GitHub, you will need to be a member of the Pictogrammers organization and have a GitHub access token.

> This is not required to work on the site, information about GitHub code contributions just will not be available when working locally if you skip this.

1. Create a GitHub personal access token.
2. Request access to the Pictogrammers organization with your token.
  - A core member will need to approve this, so it may take some time.
3. Create a `.env` file.
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

&copy; Copyright 2023 Pictogrammers. All company logos are copyrighted by their respective owners.
