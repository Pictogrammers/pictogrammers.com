import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'clsx';
import { VirtuosoGrid } from 'react-virtuoso';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tooltip from '@mui/material/Tooltip';
import Chip, { ChipProps } from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Dialog from '@mui/material/Dialog';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiCloseCircle, mdiCreation, mdiMagnify, mdiTag } from '@mdi/js';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import useCategories, { CategoryProps } from '../../hooks/useCategories';
import useIcons from '../../hooks/useIcons';
import useDebounce from '../../hooks/useDebounce';
import useWindowSize from '../../hooks/useWindowSize';

import Head from '../Head/Head';
import LibraryMenu from './LibraryMenu';
import LibraryViewMode, { viewModes } from './LibraryViewMode';
import IconView from '../IconView/IconView';
import CarbonAd from '../CarbonAd/CarbonAd';

import iconLibraries from '../../public/libraries/libraries.json';
import allContributors from '../../public/contributors/contributors.json';

import classes from './IconLibraryView.module.scss';

interface IconLibraryViewProps {
  author?: string;
  category?: string;
  libraryInfo: IconLibrary;
  slug: string;
  version?: string;
}

const IconLibraryView: FunctionComponent<IconLibraryViewProps> = ({ author, category, libraryInfo, slug, version }) => { 
  // Filter handling
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const iconLibraryHeadingRef = useRef<HTMLDivElement>(null);
  const iconLibraryRef = useRef<HTMLDivElement>(null);
  const [ searchTerm, setSearchTerm ] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 250);

  // Library release info
  const {
    date: libraryReleaseDate,
    version: libraryVersion
  } = iconLibraries[libraryInfo.id as keyof typeof iconLibraries];

  // Responsive concerns
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  // Library viewing
  const [ viewMode, setViewMode ] = useState(isMobileWidth ? 'compact' : 'comfortable');
  const categories = useCategories(libraryInfo.id);
  const visibleIcons = useIcons(libraryInfo.id, { author, category, term: debouncedSearchTerm, version });

  // Individual icon viewing
  const router = useRouter();
  const [ iconModal, setIconModal ] = useState<IconLibraryIcon | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      scrollToTopOfLibrary();
    }
  }, [ debouncedSearchTerm, visibleIcons.length ]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === `/library/${libraryInfo.id}`) {
        setIconModal(null);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [ libraryInfo.id, router ]);

  const scrollToTopOfLibrary = () => {
    const libraryTop = iconLibraryRef.current?.getBoundingClientRect().top;
    const headingHeight = iconLibraryHeadingRef.current?.clientHeight;

    if (!libraryTop || !headingHeight) {
      return;
    }

    const top = libraryTop + window.pageYOffset - headingHeight;
    if (window.scrollY > top) {
      window.scrollTo({ top });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    searchBoxRef.current?.focus();
    scrollToTopOfLibrary();
  };

  const handleIconModalOpen = (e: MouseEvent<HTMLAnchorElement>, icon: IconLibraryIcon) => {
    e.preventDefault();

    const cats = icon.t.map((tag) => categories.find((cat) => cat.id === Number(tag)));
    if (cats) {
      icon.categories = cats as CategoryProps[];
    }
    setIconModal(icon);
    router.push(`/library/${libraryInfo.id}/icon/${icon.n}`, undefined, { shallow: true });
  };

  const handleIconModalClose = () => {
    setIconModal(null);
    router.push(`/library/${slug}`, undefined, { shallow: true });
  };

  const handleChipDelete = () => {
    router.push(`/library/${libraryInfo.id}`);
  };

  const renderCategories = () => {
    if (!categories?.length) {
      return null;
    }

    return (
      <Fragment>
        <ListSubheader sx={{ background: 'transparent', marginTop: '1rem', textTransform: 'uppercase' }}>Categories</ListSubheader>
        {categories?.length && Object.keys(categories).map((catId) => {
          const categorySlug = categories[catId as any].slug;
          return (
            <ListItemButton
              component={Link}
              href={`/library/${libraryInfo.id}/category/${categorySlug}`}
              key={catId}
              selected={categorySlug === category}
            >
              <ListItemText>
                {categories[catId as any].name}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </Fragment>
    );
  };

  const renderFilteredByChip = (size: ChipProps['size'] = undefined) => {
    if (version) {
      return <Chip color='primary' icon={<Icon path={mdiCreation} size={.7} />} label={`Added in v${version}`} onDelete={handleChipDelete} size={size} sx={{ margin: '0 .25rem 0 .5rem' }} />;
    }

    if (category) {
      const categoryName = categories.find((cat) => cat.slug === category)?.name || category;
      return <Chip color='secondary' icon={<Icon path={mdiTag} size={.7} />} label={categoryName} onDelete={handleChipDelete} size={size} sx={{ margin: '0 .25rem 0 .5rem' }} />;
    }
    
    if (author) {
      const { contributors } = allContributors;
      const authorInfo = contributors.find((contributor) => contributor.github === author);
      if (authorInfo) {
        return <Chip avatar={<Avatar alt={authorInfo.name} src={`/contributors/${authorInfo.id}.jpg`} />} label={`Created by ${authorInfo.name}`} onDelete={handleChipDelete} size={size} />;
      }

      return <Chip label={`By ${author}`} onDelete={handleChipDelete} size={size} />;
    }
  };

  const renderInformationBox = () => {
    if (version && !debouncedSearchTerm) {
      return (
        <Alert classes={{ root: classes.infoAlert }} severity='warning'>
          <AlertTitle>New Icons in v{version}</AlertTitle>
          Please be sure to check the <Link href={`/docs/library/${libraryInfo.id}/changelog`}>changelog</Link> before updating as icon updates, removals, and renames are not reflected here. For real-time updates, check the <Link href={`/library/${libraryInfo.id}/history`}>history</Link> page.
        </Alert>
      );
    }

    return (
      <Alert
        classes={{
          root: cx(classes.infoAlert, {
            [classes.hide]: isMobileWidth
          })
        }}
        severity='info'
      >
        <AlertTitle>Not finding it?</AlertTitle>
        Head over to our GitHub repo and <Link href={`${libraryInfo.git}/issues/new?labels=Icon+Request&template=1_icon_request.yml`}>suggest it</Link>. You can also <Link href={`${libraryInfo.git}/issues/new?labels=Icon+Request%2CContribution&template=2_contribution.yml`}>contribute</Link> your idea if you&apos;re feeling creative!
      </Alert>
    );
  };

  const renderInformationGrid = () => {
    return (
      <div className={classes.infoGrid}>
        {renderInformationBox()}
        <CarbonAd displayOnMobile={false} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Head
        description={libraryInfo.description}
        title={`${libraryInfo.name} - Icon Library`}
      />
      <Paper className={classes.container}>
        <div className={classes.libraryView}>
          <div className={classes.heading} ref={iconLibraryHeadingRef}>
            <div className={classes.libraryInfo}>
              <LibraryMenu compact={isMobileWidth} selectedLibrary={libraryInfo} />
              <Tooltip arrow title={`Released on ${dayjs(libraryReleaseDate).format('MMMM Do, YYYY')}`} placement='left'>
                <Link href={`/library/${libraryInfo.id}/history`}>
                  <Chip
                    color='secondary'
                    label={`v${libraryVersion}`}
                    sx={{ cursor: 'pointer' }}
                  />
                </Link>
              </Tooltip>
            </div>
            <div className={classes.controls}>
              <TextField
                classes={{ root: classes.searchBox }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={handleSearchClear}
                      position='end'
                      sx={{
                        cursor: searchTerm !== '' ? 'pointer' : 'default'
                      }}
                    >
                      {searchTerm !== '' && <Icon path={mdiCloseCircle} size={1} />}
                      {searchTerm === '' && <Icon path='' size={1} />}
                    </InputAdornment>
                  ),
                  inputRef: searchBoxRef,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon path={mdiMagnify} size={1} />
                      {!isMobileWidth && renderFilteredByChip('small')}
                    </InputAdornment>
                  )
                }}
                onChange={handleSearchChange}
                placeholder={`Seach ${visibleIcons.length} Icons...`}
                size='small'
                sx={{
                  margin: '0 1rem 0 0'
                }}
                value={searchTerm}
                variant='outlined'
              />
              <LibraryViewMode
                currentView={viewMode}
                compact={isMobileWidth}
                setViewMode={setViewMode}
              />
            </div>
            {isMobileWidth && (author || category || version) && (
              <div className={classes.mobileControls}>
                <strong>Filter:</strong> {renderFilteredByChip()}
              </div>
            )}
          </div>
          <div className={classes.iconLibrary} ref={iconLibraryRef}>
            <aside className={classes.sidebar}>
              <List dense>
                <ListItemButton
                  component={Link}
                  href={`/library/${libraryInfo.id}/version/${libraryVersion}`}
                  selected={version === libraryVersion}
                >
                  <Icon path={mdiCreation} size={.8} />
                  <ListItemText sx={{ marginLeft: '.2rem' }}>New in v{libraryVersion}</ListItemText>
                </ListItemButton>
                {renderCategories()}
                <ListSubheader sx={{ background: 'transparent', marginTop: '1rem', textTransform: 'uppercase' }}>Releases</ListSubheader>
                <ListItemButton component={Link} href={`/docs/library/${libraryInfo.id}/releases/changelog`}>
                  <ListItemText>Changelog</ListItemText>
                </ListItemButton>
                <ListItemButton component={Link} href={`/docs/library/${libraryInfo.id}/releases/upgrade`}>
                  <ListItemText>Upgrade Guide</ListItemText>
                </ListItemButton>
                <ListItemButton component={Link} href={`/library/${libraryInfo.id}/history`}>
                  <ListItemText>History</ListItemText>
                </ListItemButton>
                
              </List>
            </aside>
            <div className={classes.libraryContainer}>
              {!visibleIcons.length && debouncedSearchTerm ? (
                <div className={classes.noResults}>
                  <Icon path={mdiAlertCircleOutline} size={3} />
                  <p>No icons were found based on your search criteria.</p>
                </div>
              ) : !visibleIcons.length ? (
                <div className={classes.loader}>
                  <CircularProgress />
                  Gathering up the icons...
                </div>
              ) : (
                <Fragment>
                  {renderInformationGrid()}
                  <VirtuosoGrid
                    data={visibleIcons}
                    listClassName={cx(classes.library, classes[viewMode])}
                    itemContent={(index, icon: IconLibraryIcon) => (
                      <Link
                        className={classes.libraryIcon}
                        href={`/library/${libraryInfo.id}/icon/${icon.n}`}
                        onClick={(e) => handleIconModalOpen(e, icon)}
                      >
                        <Icon path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} />
                        <p>{icon.n}</p>
                      </Link>
                    )}
                    totalCount={visibleIcons.length}
                    useWindowScroll
                  />
                </Fragment>
              )}
              {!!iconModal && (
                <Dialog
                  fullScreen={isMobileWidth}
                  fullWidth
                  maxWidth={'lg'}
                  open
                  onClose={handleIconModalClose}
                >
                  <IconView icon={iconModal} libraryInfo={libraryInfo} onClose={handleIconModalClose} />
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default IconLibraryView;
