import { Fragment, FunctionComponent } from 'react';
import cx from 'clsx';
import ExportedImage from 'next-image-export-optimizer';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import {
  mdiArrowExpand,
  mdiCheck,
  mdiClose,
  mdiDotsHorizontal,
  mdiDotsHorizontalCircleOutline,
  mdiTag,
  mdiTagOutline,
  mdiXml
} from '@mdi/js';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';
import { ContributorProps } from '../../interfaces/contributor';

import Head from '../Head/Head';
import Link from '../Link/Link';
import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';
import IconPreview from '../IconPreview/IconPreview';
import IconUsageExamples from '../IconUsageExamples/IconUsageExamples';
import IconDownloadMenu from './IconDownloadMenu';
import CarbonAd from '../CarbonAd/CarbonAd';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import useWindowSize from '../../hooks/useWindowSize';
import { useData } from '../../providers/DataProvider';

import classes from './IconView.module.scss';

interface IconViewProps {
  icon: IconLibraryIcon;
  libraryInfo: IconLibrary;
  onClose?: Function;
}

const IconView: FunctionComponent<IconViewProps> = ({ icon, libraryInfo, onClose }) => {
  const { exampleTypes, git, gridSize = 24, name: libraryName } = libraryInfo;
  const { contributors } = useData();
  const copy = useCopyToClipboard();
  const windowSize = useWindowSize();
  const isTabletWidth = windowSize.width <= parseInt(classes['tablet-width']);
  const isModal = !!onClose;

  const contributor = contributors.find((c: ContributorProps) => c.id === icon.a);
  const glyph = String.fromCodePoint(parseInt(icon.cp, 16));
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}"><title>${icon.n}</title><path d="${icon.p}" /></svg>`;

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
          <Link href={`/library/${libraryInfo.id}`}>{libraryName}</Link>
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
      <Head
        description={`The icon "${icon.n}" was added in v${icon.v} of the ${libraryName} icon library.`}
        title={`${icon.n} - ${libraryName}`}
      />
      <ConditionalWrapper
        condition={!onClose}
        wrapper={(children: any) => (
          <Paper className={classes.container}>
            {children}
          </Paper>
        )}
      >
        <Fragment>
          {isModal ? (
            <div className={classes.modalTitle}>
              {renderTitle()}
              <div className={classes.modalActions}>
                <Tooltip arrow placement='top' title='View Details'>
                  <IconButton
                    aria-label='View Details'
                    href={`/library/${libraryInfo.id}/icon/${icon.n}`}
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
          ) : (
            <div className={classes.pageTitle}>
              {renderTitle()}
              <div className={classes.ad}>
                <CarbonAd />
              </div>
            </div>
          )}
          <div className={classes.infoBar}>
            <div className={classes.info}>
              <Tooltip arrow placement='top' title={`View the v${icon.v} release`}>
                <Link href={`/library/${libraryInfo.id}/version/${icon.v}`} onClick={() => onClose?.()}>
                  <Chip
                    color='primary'
                    icon={<Icon path={mdiCheck} size={.8} />}
                    label={isTabletWidth ? icon.v : `Added in v${icon.v}`}
                    sx={{ cursor: 'pointer' }}
                  />
                </Link>
              </Tooltip>
              {contributor && (
                <Tooltip arrow placement='top' title={`View ${contributor.name}`}>
                  <Link href={`/contributor/${contributor.github}`} onClick={() => onClose?.()}>
                    <Chip
                      icon={
                        <Avatar
                          sx={{
                            backgroundColor: `hsl(var(${contributor.core ? '--primary-color' : '--dark-cyan'}))`,
                            border: `2px solid hsl(var(${contributor.core ? '--primary-color' : '--dark-cyan'}))`,
                            color: 'hsl(var(--white)) !important',
                            fontSize: '.8rem',
                            height: 24,
                            width: 24
                          }}
                        >
                          {contributor.image ? (
                            <ExportedImage
                              alt={contributor.name}
                              height={24}
                              placeholder='empty'
                              src={`/contributors/${contributor.id}.jpg`}
                              width={24}
                            />
                          ) : contributor.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </Avatar>
                      }
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
                  <Icon path={mdiXml} size={1} />
                </IconButton>
              </Tooltip>
              <IconDownloadMenu icon={icon} library={libraryInfo} />
            </div>
          </div>
          <div className={classes.usage}>
            <IconPreview gridSize={gridSize} path={icon.p} />
            <IconUsageExamples exampleTypes={exampleTypes} library={libraryInfo.id} iconName={icon.n} />
          </div>
          <div className={classes.tags}>
            <div className={classes.categories}>
              {icon?.categories?.map((tag) => {
                return (
                  <Tooltip arrow key={tag.slug} placement='top' title={`View all ${tag.name} icons`}>
                    <Link href={`/library/${libraryInfo.id}/category/${tag.slug}`} onClick={() => onClose?.()}>
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
          <div className={classes.tags}>
            <div className={classes.categories}>
              <Tooltip arrow placement='top' title='Suggest a tag'>
                <Link href={`${git}/issues/new?labels=Tag&template=5_tag.md&title=Tag%20%22${encodeURIComponent(icon.n)}%22%20with%20%3Ctag%3E`} onClick={() => onClose?.()}>
                  <Chip icon={<Icon path={mdiTagOutline} size={.7} />} label='Suggest a tag' sx={{ borderColor: 'hsl(var(--dark-cyan))', color: 'hsl(var(--dark-cyan))', cursor: 'pointer' }} variant='outlined' />
                </Link>
              </Tooltip>
            </div>
            <div className={classes.aliases}>
              <Tooltip arrow placement='top' title='Suggest an alias'>
                <Link href={`${git}/issues/new?labels=Alias&template=4_alias.md&title=Alias%20%22${encodeURIComponent(icon.n)}%22%20with%20%3Calias%3E`} onClick={() => onClose?.()}>
                  <Chip icon={<Icon path={mdiDotsHorizontal} size={.7} />} label='Suggest an alias' sx={{ borderColor: 'hsl(var(--dark-grey))', color: 'hsl(var(--dark-grey))', cursor: 'pointer' }} variant='outlined' />
                </Link>
              </Tooltip>
            </div>
          </div>  
        </Fragment>
      </ConditionalWrapper>
    </div>
  );
};

export default IconView;
