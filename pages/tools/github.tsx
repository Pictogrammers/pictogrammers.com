import { Fragment } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Alert from '@mui/material/Alert';

import Layout from '../../components/Docs/Layout/Layout';
import CodeHighlighter from '../../components/CodeHighlighter/CodeHighlighter';
import IconPreviewGenerator from '../../components/IconPreviewGenerator/IconPreviewGenerator';

const ToolsGitHub: NextPage = () => {
  const title = 'GitHub Preview Generator';
  const path = 'pages/tools/github.tsx';

  return (
    <Fragment>
      <Head>
        <title>{title} - Tools - Pictogrammers</title>
        <meta content={`${title} - Tools - Pictogrammers`} name='title' key='title' />
      </Head>
      <Layout
        breadcrumbs={<Link href='/tools'>Tools</Link>}
        improvePage={{
          gitHubUrl: `https://github.com/Pictogrammers/pictogrammers.com/blob/main/${path}`,
          suggestUrl: `https://github.com/Pictogrammers/pictogrammers.com/issues/new?title=${encodeURIComponent(`Suggested Change to "${title}"`)}&body=${encodeURIComponent(`*URL:* https://pictogrammers.com/${path}\n\n<!-- Describe how you would improve the page here -->`)}`
        }}
        title='GitHub Preview Generator'
      >
        <IconPreviewGenerator />
        <div>
          <h2>Instructions</h2>
          <ul>
            <li>The SVG artboard should be 24dp x 24dp.</li>
            <li>When you&apos;ve completed your design, select all shapes and paths. Then unite or combine paths.</li>
            <li>Export as an SVG.</li>
            <li>Upload the file above <i>or...</i></li>
            <li>
              Open then exported SVG file in a text editor.
              <ul>
                <li>Find the <CodeHighlighter>path d=&quot;&quot;</CodeHighlighter> in the source.</li>
                <li>Copy the contents of the <CodeHighlighter>d</CodeHighlighter> attribute into the path field above.</li>
              </ul>
            </li>
          </ul>
        </div>
      </Layout>
    </Fragment>
  );
};

export default ToolsGitHub;
