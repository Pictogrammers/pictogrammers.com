- "Get Started" call to action in the homepage Hero.
- Contributors:
  - Modify Contributor GET endpoint to return core status.
  - Prefetch all user avatars and cache on file system during build.
- Generate sitemap.xml.
  - https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
- Tree-shaking not working with import * on mdi/js.
- Brand Guideline page headings need anchors.
- All the favicons/PWA stuff needs to be added to _document.
  - Doc: https://nextjs.org/docs/advanced-features/custom-document
  - See for example: https://gitlab.com/kachkaev/website-frontend/blob/ec20c3bfec24cde40d80194bcad5ba69b308a5ef/src/pages/_document.tsx#L31

EXTERNAL TO SITE:
- Start publishing `@mdi/react` as `@pictogrammers/react`.
- Do we want to switch to `@pictogrammers/mdi-js`, `@pictogrammers/mdi-svg`, `@pictogrammers/mdi-font`, etc?
