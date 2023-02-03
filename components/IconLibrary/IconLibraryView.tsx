import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useRouter } from 'next/router';
import cx from 'clsx';
import ExportedImage from 'next-image-export-optimizer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Chip, { ChipProps } from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mdi/react';
import {
  mdiAlertCircleOutline,
  mdiAlertOctagonOutline,
  mdiArrowUpBoldCircleOutline,
  mdiClose,
  mdiCreation,
  mdiHistory,
  mdiLicense,
  mdiListBoxOutline,
  mdiMagnify,
  mdiTag,
  mdiTagOutline
} from '@mdi/js';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

import { IconLibrary } from '../../interfaces/icons';
import { ContributorProps } from '../../interfaces/contributor';

import useCategories from '../../hooks/useCategories';
import useIcons from '../../hooks/useIcons';
import useDebounce from '../../hooks/useDebounce';
import useWindowSize from '../../hooks/useWindowSize';
import { useData } from '../../providers/DataProvider';

import Head from '../Head/Head';
import Link from '../Link/Link';
import LibraryMenu from './LibraryMenu';
import LibraryViewMode from './LibraryViewMode';
import IconGrid from '../IconGrid/IconGrid';
import CarbonAd from '../CarbonAd/CarbonAd';

import iconLibraries from '../../public/data/libraries.json';

import classes from './IconLibraryView.module.scss';

interface IconLibraryViewProps {
  author?: string;
  category?: string;
  deprecated?: boolean;
  libraryInfo: IconLibrary;
  slug: string;
  version?: string;
}

const IconLibraryView: FunctionComponent<IconLibraryViewProps> = ({
  author,
  category,
  deprecated: showDeprecated,
  libraryInfo,
  slug,
  version
}) => {
  const router = useRouter();

  // Filter handling
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const iconLibraryHeadingRef = useRef<HTMLDivElement>(null);
  const iconLibraryRef = useRef<HTMLDivElement>(null);
  const [ searchTerm, setSearchTerm ] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Library release info
  const {
    date: libraryReleaseDate,
    deprecatedCount,
    version: libraryVersion
  } = iconLibraries[libraryInfo.id as keyof typeof iconLibraries];

  // Responsive concerns
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width > 0 && windowSize.width <= parseInt(classes['mobile-width']);

  // Library viewing
  const [ carbonKey, setCarbonKey ] = useState(new Date().toString());
  const [ viewMode, setViewMode ] = useState('default');
  const { contributors } = useData();
  const categories = useCategories(libraryInfo.id);
  const filter = useMemo(() => ({
    author, category, deprecated: showDeprecated, term: debouncedSearchTerm, version
  }), [ author, category, debouncedSearchTerm, showDeprecated, version ]);
  const visibleIcons = useIcons(libraryInfo.id, filter);

  useEffect(() => {
    if (isMobileWidth) {
      setViewMode('comfortable');
    }
  }, [ isMobileWidth ]);

  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q as string);
      router.push(`/library/${slug}`, undefined, { shallow: true });
    }
  }, [ router, slug ]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      scrollToTopOfLibrary();
    }
  }, [ debouncedSearchTerm, visibleIcons.length ]);

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

  const handleChipDelete = () => {
    router.push(`/library/${libraryInfo.id}`);
  };

  const renderCategories = () => {
    if (!categories?.length) {
      return null;
    }

    return (
      <Fragment>
        <ListSubheader classes={{ root: classes.subheader }}>Categories</ListSubheader>
        {categories?.length && Object.keys(categories).map((catId) => {
          const categorySlug = categories[catId as any].slug;
          return (
            <ListItem disablePadding key={catId}>
              <ListItemButton
                component={Link}
                href={`/library/${libraryInfo.id}/category/${categorySlug}`}
                selected={categorySlug === category}
              >
                <Icon path={mdiTagOutline} size={.8} />
                <ListItemText>
                  {categories[catId as any].name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </Fragment>
    );
  };

  const renderFilteredByChip = (size: ChipProps['size'] = undefined) => {
    if (version) {
      return <Chip color='primary' icon={<Icon path={mdiCreation} size={.7} />} label={`New in v${version}`} onDelete={handleChipDelete} size={size} sx={{ margin: '0 .25rem 0 .5rem' }} />;
    }

    if (category) {
      const categoryName = categories.find((cat) => cat.slug === category)?.name || category;
      return <Chip color='secondary' icon={<Icon path={mdiTag} size={.7} />} label={categoryName} onDelete={handleChipDelete} size={size} sx={{ margin: '0 .25rem 0 .5rem' }} />;
    }

    if (showDeprecated) {
      return <Chip color='error' icon={<Icon path={mdiAlertOctagonOutline} size={.7} />} label='Deprecated Icons' onDelete={handleChipDelete} size={size} sx={{ margin: '0 .25rem 0 .5rem' }} />;
    }

    if (author) {
      const authorInfo = contributors.find((contributor: ContributorProps) => contributor.github === author);
      if (authorInfo) {
        return (
          <Chip
            avatar={
              <Avatar
                sx={{
                  backgroundColor: `hsl(var(${authorInfo.core ? '--primary-color' : '--dark-cyan'}))`,
                  border: `1px solid hsl(var(${authorInfo.core ? '--primary-color' : '--dark-cyan'}))`,
                  color: 'hsl(var(--white)) !important'
                }}
              >
                {authorInfo.image ? (
                  <ExportedImage
                    alt={authorInfo.name}
                    height={18}
                    placeholder='empty'
                    src={`/images/contributors/${authorInfo.id}.jpg`}
                    width={18}
                  />
                ) : authorInfo.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </Avatar>
            }
            label={`Created by ${authorInfo.name}`}
            onDelete={handleChipDelete}
            size={size}
          />
        );
      }

      return (
        <Chip
          avatar={
            <Avatar sx={{ background: 'hsl(var(--primary-color))', color: 'hsl(var(--white)) !important', fontWeight: 700 }}>{author.charAt(0).toUpperCase()}</Avatar>
          }
          label={`Created by ${author}`}
          onDelete={handleChipDelete}
          size={size}
        />
      );
    }
  };

  const renderInformationBox = () => {
    if (version && !debouncedSearchTerm) {
      return (
        <Alert classes={{ root: classes.infoAlert }} severity='warning'>
          <AlertTitle>New Icons in v{version}</AlertTitle>
          Please be sure to check the <Link href={`/docs/library/${libraryInfo.id}/releases/changelog`}>changelog</Link> before updating as icon updates, removals, and renames are not reflected here. For real-time updates, check the <Link href={`/library/${libraryInfo.id}/history`}>history</Link> page.
        </Alert>
      );
    }

    if (!!showDeprecated) {
      return (
        <Alert classes={{ root: classes.infoAlert }} severity='error'>
          <AlertTitle>Deprecated Icons</AlertTitle>
          The icons below have been deprecated and will be removed in an upcoming release. Please check the <Link href={`/docs/library/${libraryInfo.id}/releases/changelog`}>changelog</Link> before updating to a new version of the library.
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
        <CarbonAd displayOnMobile={false} key={carbonKey} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Head
        description={libraryInfo.description}
        title={`${libraryInfo.name} - Icon Library`}
      >
        <link rel='canonical' href={`https://pictogrammers.com/library/${libraryInfo.id}`} />
      </Head>
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
                    sx={{ cursor: 'pointer', fontSize: '.9rem', fontWeight: 700 }}
                  />
                </Link>
              </Tooltip>
            </div>
            <div className={classes.controls}>
              <TextField
                classes={{ root: classes.searchBox }}
                fullWidth
                InputProps={{
                  endAdornment: searchTerm && searchTerm !== '' && (
                    <InputAdornment
                      onClick={handleSearchClear}
                      position='end'
                      sx={{ cursor: 'pointer' }}
                    >
                      <Icon path={mdiClose} size={.9} />
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
                placeholder={`Search ${visibleIcons.length} Icon${visibleIcons.length === 1 ? '' : 's'}...`}
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
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href={`/library/${libraryInfo.id}/version/${libraryVersion}`}
                    selected={version === libraryVersion}
                  >
                    <Icon path={mdiCreation} size={.8} />
                    <ListItemText>New in v{libraryVersion}</ListItemText>
                  </ListItemButton>
                </ListItem>
                {!!deprecatedCount && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      href={`/library/${libraryInfo.id}/deprecated`}
                      selected={!!showDeprecated}
                    >
                      <Icon path={mdiAlertOctagonOutline} size={.8} />
                      <ListItemText>Deprecated Icons</ListItemText>
                    </ListItemButton>
                  </ListItem>
                )}
                <ListSubheader classes={{ root: classes.subheader }}>Releases</ListSubheader>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href={`/docs/library/${libraryInfo.id}/releases/changelog`}>
                    <Icon path={mdiListBoxOutline} size={.8} />
                    <ListItemText>Changelog</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href={`/docs/library/${libraryInfo.id}/releases/upgrade`}>
                    <Icon path={mdiArrowUpBoldCircleOutline} size={.8} />
                    <ListItemText>Upgrade Guide</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href={`/library/${libraryInfo.id}/history`}>
                    <Icon path={mdiHistory} size={.8} />
                    <ListItemText>History</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href={'/docs/general/license'}>
                    <Icon path={mdiLicense} size={.8} />
                    <ListItemText>License</ListItemText>
                  </ListItemButton>
                </ListItem>
                {renderCategories()}
              </List>
            </aside>
            <div className={classes.libraryContainer}>
              {!visibleIcons.length && (debouncedSearchTerm || !!showDeprecated) ? (
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
                  <IconGrid icons={visibleIcons} library={libraryInfo} modalHook={() => setCarbonKey(new Date().toString())} viewMode={viewMode} />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default IconLibraryView;
