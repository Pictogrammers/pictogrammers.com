import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'clsx';
import { VirtuosoGrid } from 'react-virtuoso';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiClose, mdiCloseCircle, mdiMagnify } from '@mdi/js';

import { IconLibraryIcon } from '../../interfaces/icons';

import useProvisionDatabase from '../../hooks/useProvisionDatabase';
import useDebounce from '../../hooks/useDebounce';
import useWindowSize from '../../hooks/useWindowSize';

import LibraryMenu from './LibraryMenu';
import LibraryViewMode, { viewModes } from './LibraryViewMode';
import IconView from './IconView';

import iconLibraries from '../../public/libraries/libraries.json';

import classes from './LibraryView.module.scss';

interface LibraryViewProps {
  library: string;
  slug: string;
}

const LibraryView: FunctionComponent<LibraryViewProps> = ({ library, slug }) => { 
  const [ tableLoaded, setTableLoaded ] = useState(false);
  const [ visibleIcons, setVisibleIcons ] = useState([]); 
  const [ categories, setCategories ] = useState<any>({});
  const [ authors, setAuthors ] = useState<any>({});

  // Icon viewing
  const router = useRouter();
  const [ iconModal, setIconModal ] = useState<IconLibraryIcon | null>(null);

  // Search handling
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const iconLibraryHeadingRef = useRef<HTMLDivElement>(null);
  const iconLibraryRef = useRef<HTMLDivElement>(null);
  const [ viewMode, setViewMode ] = useState('comfortable');
  const [ searchTerm, setSearchTerm ] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 250);

  // Library config and metadata
  const { publicRuntimeConfig: { libraries } } = getConfig();
  const libraryConfig = libraries.icons.find((c: any) => c.id === library);
  const {
    count: totalIcons,
    date: libraryReleaseDate,
    version: libraryVersion
  } = iconLibraries[library as keyof typeof iconLibraries];

  const database = useProvisionDatabase(library);
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  // TODO: Break each of these useEffect's into hooks
  useEffect(() => {
    const getIcons = async () => {
      if (!database) {
        return;
      }

      const table = await database.table('icons');

      if (debouncedSearchTerm !== '') {
        const replaceLibraryId = new RegExp(`(^${library})`, 'gi');
        const term = debouncedSearchTerm
          .replace(/([A-Z][a-z])/g,' $1') // Add a space in front of letters is Pascal-case is used
          .replace(/(\d+)/g,' $1') // Add a space in front of numbers if Pascal-case is used
          .replace(replaceLibraryId, '') // Remove a prefix of the library ID
          .split(/-| /) // Split into chuncks on spaces and dashes
          .filter((v: string) => v !== ''); // Filter out empty values

        const filtered = await table
          .where('n').equalsIgnoreCase(debouncedSearchTerm)
          .or('st').startsWithAnyOfIgnoreCase(term)
          .distinct()
          .toArray();

        setVisibleIcons(filtered);
        setTableLoaded(true);
        scrollToTopOfLibrary();
        return;
      }
      
      const output = await table.orderBy('n').toArray();
      setVisibleIcons(output);
      setTableLoaded(true);
    };
    getIcons();
  }, [ database, debouncedSearchTerm, library ]);

  useEffect(() => {
    const getAuthors = async () => {
      if (!database) {
        return;
      }

      const result = await database.table('authors').orderBy('name').toArray();
      setAuthors(result);
    };
    getAuthors();
  }, [ database ]);

  useEffect(() => {
    const getCategories = async () => {
      if (!database) {
        return;
      }

      const result = await database.table('tags').orderBy('name').toArray();
      setCategories(result);
    };
    getCategories();
  }, [ database ]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === `/icons/${library}`) {
        setIconModal(null);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [ library, router ]);

  const scrollToTopOfLibrary = () => {
    const libraryTop = iconLibraryRef.current?.getBoundingClientRect().top;
    const headingHeight = iconLibraryHeadingRef.current?.clientHeight;

    if (!libraryTop || !headingHeight) {
      return;
    }

    const top = libraryTop + window.pageYOffset - headingHeight;
    window.scrollTo({ top });
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
    setIconModal(icon);
    router.push(`/icons/${library}/${icon.n}`, undefined, { shallow: true });
  };

  const handleIconModalClose = () => {
    setIconModal(null);
    router.push(`/icons/${library}`, undefined, { shallow: true });
  };

  const isLoading = !!(!database || !tableLoaded);

  return (
    <div className={classes.root}>
      <Head>
        <title>{`${libraryConfig.name} - Icon Library - Pictogrammers`}</title>
        <meta content={`${libraryConfig.name} - Icon Library - Pictogrammers`} name='title' key='title' />
        {libraryConfig.description && <meta content={libraryConfig.description} name='description' key='description' />}

        <meta content={`${libraryConfig.name} - Icon Library - Pictogrammers`} property='og:title' key='og:title' />
        {libraryConfig.description && <meta content={libraryConfig.description} property='og:description' key='og:description' />}
        <meta content={`https://pictogrammers.com/${slug}`} property='og:url' key='og:url' />

        <meta content={`${libraryConfig.name} - Icon Library - Pictogrammers`} name='twitter:title' key='twitter:title' />
        {libraryConfig.description && <meta content={libraryConfig.description} name='twitter:description' key='twitter:description' />}
      </Head>
      <Paper className={classes.container}>
        <div className={classes.libraryView}>
          <div className={classes.heading} ref={iconLibraryHeadingRef}>
            <div className={classes.libraryInfo}>
              <LibraryMenu compact={isMobileWidth} selectedLibrary={libraryConfig} />
              <Tooltip title={`Released on ${dayjs(libraryReleaseDate).format('YYYY/MM/DD')}`} placement='left'>
                <Chip label={`v${libraryVersion}`} />
              </Tooltip>
            </div>
            <div className={classes.controls}>
              <TextField
                classes={{ root: classes.searchBox }}
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
                    </InputAdornment>
                  )
                }}
                onChange={handleSearchChange}
                placeholder={isMobileWidth ? 'Search Icons...' : `Search ${totalIcons} icons...`}
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
          </div>
          <div className={classes.iconLibrary} ref={iconLibraryRef}>
            {isLoading && (
              <div className={classes.loader}>
                <CircularProgress />
                Gathering up the icons...
              </div>
            )}
            {!isLoading && (
              <Fragment>
                <aside className={classes.sidebar}>
                  <List dense>
                    <ListItemButton component={Link} href={`${libraryConfig.git}/issues/new?assignees=&labels=Icon+Request&template=1_icon_request.yml`}>
                      <ListItemText>Request an Icon</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} href={`${libraryConfig.git}/issues/new?assignees=&labels=Icon+Request%2CContribution&template=2_contribution.yml`}>
                      <ListItemText>Contribute an Icon</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} href={`${libraryConfig.git}/issues/new?assignees=&labels=Alias&template=4_alias.yml`}>
                      <ListItemText>Suggest an Alias</ListItemText>
                    </ListItemButton>
                    <ListSubheader sx={{ marginTop: '1rem', textTransform: 'uppercase' }}>Releases</ListSubheader>
                    <ListItemButton component={Link} href={`/docs/${library}/changelog`}>
                      <ListItemText>Changelog</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} href={`/docs/${library}/upgrade`}>
                      <ListItemText>Upgrade Guide</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} href={`/history/${library}`}>
                      <ListItemText>History</ListItemText>
                    </ListItemButton>
                    <ListSubheader sx={{ marginTop: '1rem', textTransform: 'uppercase' }}>Categories</ListSubheader>
                    {Object.keys(categories).map((catId) => (
                      <ListItemButton key={catId}>
                        <ListItemText>
                          {categories[catId as keyof typeof categories].name}
                        </ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                </aside>
                <div className={classes.libraryContainer}>
                  {!visibleIcons.length ? (
                    <div className={classes.noResults}>
                      <Icon path={mdiAlertCircleOutline} size={3} />
                      <p>No icons were found based on your search criteria.</p>
                    </div>
                  ) : (
                    <VirtuosoGrid
                      data={visibleIcons}
                      itemClassName={classes.libraryItem}
                      listClassName={cx(classes.library, classes[viewMode])}
                      itemContent={(index, icon: IconLibraryIcon) => (
                        <Link
                          className={classes.libraryIcon}
                          href={`/icons/${library}/${icon.n}`}
                          onClick={(e) => handleIconModalOpen(e, icon)}
                        >
                          <Icon path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} />
                          <p>{icon.n}</p>
                        </Link>
                      )}
                      totalCount={totalIcons}
                      useWindowScroll
                    />
                  )}
                  {!!iconModal && (
                    <Dialog
                      fullScreen={isMobileWidth}
                      open
                      onClose={handleIconModalClose}
                    >
                      <DialogTitle sx={{ position: 'sticky', textAlign: 'right', top: 0 }}>
                        <IconButton
                          aria-label='Close'
                          onClick={handleIconModalClose}
                        >
                          <Icon path={mdiClose} size={1} />
                        </IconButton>
                      </DialogTitle>
                      <IconView icon={iconModal} library={libraryConfig.id} />
                    </Dialog>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LibraryView;
