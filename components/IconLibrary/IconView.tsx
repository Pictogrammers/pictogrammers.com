import { Fragment, FunctionComponent } from 'react';
import cx from 'clsx';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiArrowExpand, mdiCheck, mdiClose, mdiDownload, mdiSvg } from '@mdi/js';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';
import IconPreview from '../IconPreview/IconPreview';
import Contributors from '../Docs/Contributors/Contributors';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';

import classes from './IconView.module.scss';

interface IconViewProps {
  icon: IconLibraryIcon;
  library: string;
  onClose?: Function;
}

const IconView: FunctionComponent<IconViewProps> = ({ icon, library, onClose }) => {
  const {
    a: author,
    cp: codepoint,
    n: name,
    p: path
  } = icon;

  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const { gridSize = 24, name: libraryName } = iconLibraries.find((lib: IconLibrary) => lib.id === library);
  const copy = useCopyToClipboard();
  const isModal = !!onClose;

  const glyph = String.fromCodePoint(parseInt(icon.cp, 16));
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}"><title>${icon.n}</title><path d="${icon.p}" /></svg>`;
  const svgDownload = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;

  const renderTitle = () => {
    return (
      <div className={classes.title}>
        <Breadcrumbs
          aria-label='breadcrumb'
          classes={{
            ol: classes.breadcrumb
          }}
          sx={{
            display: isModal ? 'none' : 'block',
            padding: '2rem 0 0 2rem'
          }}
        >
          <Link href='/libraries/'>Icons & Fonts</Link>
          <Link href={`/library/${library}`}>{libraryName}</Link>
        </Breadcrumbs>
        <div className={classes.iconName}>
          <Icon path={icon.p} size={2} />
          <Tooltip arrow placement='top' title='Copy Icon Name'>
            <h1 onClick={() => copy(name, 'icon name')}>{name}</h1>
          </Tooltip>
        </div>           
      </div>
    );
  };

  return (
    <div className={cx(classes.root, {
      [classes.modal]: isModal
    })}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <ConditionalWrapper
        condition={!onClose}
        wrapper={(children: any) => (
          <Paper className={classes.container}>
            {children}
          </Paper>
        )}
      >
        <Fragment>
          {isModal && (
            <div className={classes.modalTitle}>
              {renderTitle()}
              <div className={classes.modalActions}>
                <Tooltip arrow placement='top' title='View Details'>
                  <IconButton
                    aria-label='View Details'
                    href={`/library/${library}/icon/${icon.n}`}
                  >
                    <Icon path={mdiArrowExpand} size={1} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Close'>
                  <IconButton
                    aria-label='Close'
                    onClick={() => onClose()}
                  >
                    <Icon path={mdiClose} size={1} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
          {!isModal && renderTitle()}
          <div className={classes.infoBar}>
            <Chip color='primary' icon={<Icon path={mdiCheck} size={.8} />} label={`Added in v${icon.v}`} />
            <div className={classes.actions}>
              <Tooltip arrow placement='top' title='Copy Codepoint'>
                <Chip label={codepoint} onClick={() => copy(codepoint, 'codepoint')} />
              </Tooltip>
              <Tooltip arrow placement='top' title='Copy Glyph'>
                <IconButton
                  aria-label='Copy Glyph'
                  color='inherit'
                  onClick={() => copy(glyph, 'glyph')}
                >
                  <Icon path={path} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title='Copy SVG'>
                <IconButton
                  aria-label='Copy SVG'
                  color='inherit'
                  onClick={() => copy(svgCode, 'SVG')}
                >
                  <Icon path={mdiSvg} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title='Download SVG'>
                <IconButton
                  aria-label='Download SVG'
                  color='inherit'
                  download={`${icon.n}\.svg`}
                  href={svgDownload}
                >
                  <Icon path={mdiDownload} size={1} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <IconPreview gridSize={gridSize} path={path} />
          <Contributors id={author} view='single' />
        </Fragment>
      </ConditionalWrapper>
    </div>
  );
};

export default IconView;
