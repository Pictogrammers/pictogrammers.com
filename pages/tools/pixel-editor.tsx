import { Fragment, useState } from 'react';
import { NextPage } from 'next';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import Editor from 'pixel-editor/src/components/Editor/Editor';
import { mdiClipboard } from '@mdi/js';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';

import Link from '../../components/Link/Link';
import Head from '../../components/Head/Head';
import Layout from '../../components/Docs/Layout/Layout';

import classes from '../../styles/pages/pixel-editor.module.scss';

const ToolsPixelEditor: NextPage = () => {
  const [ path, setPath ] = useState('');
  const copy = useCopyToClipboard();

  return (
    <Fragment>
      <Head title='Pixel Editor - Tools' />
      <Layout
        breadcrumbs={<Link href='/tools'>Tools</Link>}
        improvePage={{
          gitHubUrl: 'https://github.com/Pictogrammers/pictogrammers.com/blob/main/pages/tools/pixel-editor.tsx',
          suggestUrl: `https://github.com/Pictogrammers/pictogrammers.com/issues/new?title=${encodeURIComponent('Suggested Change to "Pixel Editor"')}&body=${encodeURIComponent('*URL:* https://pictogrammers.com/pages/tools/pixel-editor.tsx\n\n<!-- Describe how you would improve the page here -->')}`
        }}
        title='Pixel Editor'
      >
        <p>The Pixel Editor is useful for creating pixel-based icons, such as those in our Memory icon library. Drag to draw, tap a box to erase.</p>
        <div className={classes.container}>
          <div className={classes.editor}>
            <Editor width={22} height={22} onChange={setPath} />
          </div>
          <code className={classes.code}>
            <Tooltip arrow placement='top' title='Copy SVG Path'>
              <IconButton
                aria-label='Copy SVG Path'
                className={classes.copy}
                color='inherit'
                onClick={() => copy(path, 'SVG path')}
              >
                <Icon path={mdiClipboard} size={1} />
              </IconButton>
            </Tooltip>
            {path}
          </code>
        </div>
      </Layout>
    </Fragment>
  );
};

export default ToolsPixelEditor;
