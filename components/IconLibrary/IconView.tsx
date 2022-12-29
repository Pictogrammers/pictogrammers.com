import { Fragment, FunctionComponent } from 'react';
import cx from 'clsx';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiArrowExpand, mdiCheck, mdiClose, mdiDotsHorizontalCircleOutline, mdiDownload, mdiSvg, mdiTag } from '@mdi/js';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';
import IconPreview from '../IconPreview/IconPreview';
import IconUsageExamples from '../IconUsageExamples/IconUsageExamples';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import useWindowSize from '../../hooks/useWindowSize';

import contributorsJson from '../../public/contributors/contributors.json';

import classes from './IconView.module.scss';

interface IconViewProps {
  icon: IconLibraryIcon;
  library: string;
  onClose?: Function;
}

const IconView: FunctionComponent<IconViewProps> = ({ icon, library, onClose }) => {
  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const { exampleTypes, gridSize = 24, name: libraryName } = iconLibraries.find((lib: IconLibrary) => lib.id === library);
  const copy = useCopyToClipboard();
  const windowSize = useWindowSize();
  const isTabletWidth = windowSize.width <= parseInt(classes['tablet-width']);
  const isModal = !!onClose;

  const contributor = contributorsJson?.contributors?.find((c) => c.id === icon.a);
  const glyph = String.fromCodePoint(parseInt(icon.cp, 16));
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}"><title>${icon.n}</title><path d="${icon.p}" /></svg>`;
  const svgDownload = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;

  const renderTitle = () => {
    return (
      <div className={classes.title}>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{
            display: isModal ? 'none' : 'block',
            fontSize: '.9rem'
          }}
        >
          <Link href='/libraries/'>Icons & Fonts</Link>
          <Link href={`/library/${library}`}>{libraryName}</Link>
        </Breadcrumbs>
        <div className={classes.iconName}>
          <Tooltip arrow placement='right' title='Copy Icon Name'>
            <h1 onClick={() => copy(icon.n, 'icon name')}>{icon.n}</h1>
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
            <div className={classes.info}>
              <Tooltip arrow placement='top' title={`View the v${icon.v} release`}>
                <Link href={`/library/${library}/version/${icon.v}`} onClick={() => onClose?.()}>
                  <Chip
                    color='primary'
                    icon={<Icon path={mdiCheck} size={.8} />}
                    label={isTabletWidth ? icon.v : `Added in v${icon.v}`}
                    sx={{ cursor: 'pointer' }}
                  />
                </Link>
              </Tooltip>
              {contributor && (
                <Tooltip arrow placement='top' title={`View icons created by ${contributor.name}`}>
                  <Link href={`/library/${library}/author/${contributor.github}`} onClick={() => onClose?.()}>
                    <Chip
                      icon={<Avatar src={`/contributors/${contributor.id}.jpg`} sx={{ height: 24, width: 24 }}/>}
                      label={isTabletWidth ? contributor.name : `Created by ${contributor.name}`}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Link>
                </Tooltip>
              )}
            </div>
            <div className={classes.actions}>
              <Tooltip arrow placement='top' title='Copy Codepoint'>
                <Chip label={icon.cp} onClick={() => copy(icon.cp, 'codepoint')} />
              </Tooltip>
              <Tooltip arrow placement='top' title='Copy Glyph'>
                <IconButton
                  aria-label='Copy Glyph'
                  color='inherit'
                  onClick={() => copy(glyph, 'glyph')}
                >
                  <Icon path={icon.p} size={1} />
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
          <div className={classes.usage}>
            <IconPreview gridSize={gridSize} path={icon.p} />
            <IconUsageExamples exampleTypes={exampleTypes} library={library} iconName={icon.n} />
          </div>
          <div className={classes.tags}>
            <div className={classes.categories}>
              {icon?.categories?.map((tag) => {
                return (
                  <Tooltip arrow key={tag.id} placement='top' title={`View all ${tag.name} icons`}>
                    <Link href={`/library/${library}/category/${tag.slug}`} onClick={() => onClose?.()}>
                      <Chip icon={<Icon path={mdiTag} size={.7} />} label={tag.name} sx={{ backgroundColor: 'hsl(var(--dark-cyan))', color: 'hsl(var(--white))', cursor: 'pointer' }} />
                    </Link>
                  </Tooltip>
                );
              })}
            </div>
            <div className={classes.aliases}>
              {icon.al.map((alias) => <Chip icon={<Icon path={mdiDotsHorizontalCircleOutline} size={.8} />} key={alias} label={alias} />)}
            </div>              
          </div>
        </Fragment>
      </ConditionalWrapper>
    </div>
  );
};

export default IconView;
