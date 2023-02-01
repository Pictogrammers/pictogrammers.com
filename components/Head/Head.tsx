import { Fragment, FunctionComponent } from 'react';
import { default as NextHead } from 'next/head';
import { useRouter } from 'next/router';
import { useAnalytics } from 'use-analytics';

interface HeadProps {
  children?: any;
  description?: string;
  noIndex?: boolean;
  readingTime?: string;
  title: string;
  type?: string;
}

const Head: FunctionComponent<HeadProps> = ({
  children,
  description,
  noIndex = false,
  readingTime,
  title,
  type = 'website'
}) => {
  const router = useRouter();

  // Register page view in analytics
  const { page } = useAnalytics();
  page({ url: `https://pictogrammers.com${router.asPath}` });

  // This has to be set as variable to avoid console warnings.
  // See: https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196
  const pageTitle = `${title} - Pictogrammers`;

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta content={pageTitle} name='title' key='title' />
      {description && <meta content={description} name='description' key='description' />}

      <meta content={pageTitle} property='og:title' key='og:title' />
      {description && <meta content={description} property='og:description' key='og:description' />}
      <meta content={type} property='og:type' key='og:type' />
      <meta content={`https://pictogrammers.com${router.asPath}`} property='og:url' key='og:url' />

      <meta content={pageTitle} name='twitter:title' key='twitter:title' />
      {description && <meta content={description} name='twitter:description' key='twitter:description' />}

      {readingTime && (
        <Fragment>
          <meta content='Reading Time' name='twitter:label1' key='twitter:label1' />
          <meta content={readingTime} name='twitter:data1' key='twitter:data1' />
        </Fragment>
      )}

      {noIndex && <meta name='robots' content='noindex' />}
      {children}
    </NextHead>
  );
};

export default Head;