import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
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
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiCloseCircle, mdiMagnify } from '@mdi/js';

import { IconLibraryIcon } from '../../interfaces/icons';

import useProvisionDatabase from '../../hooks/useProvisionDatabase';
import useDebounce from '../../hooks/useDebounce';
import useWindowSize from '../../hooks/useWindowSize';

import LibraryMenu from './LibraryMenu';
import LibraryViewMode from './LibraryViewMode';

import iconLibraries from '../../public/libraries/libraries.json';

import classes from './LibraryView.module.scss';

interface LibraryViewProps {
  library: string;
  slug: string;
}

const viewSizes = {
  comfortable: 2,
  compact: 1.2,
  list:  .8
};

const LibraryView: FunctionComponent<LibraryViewProps> = ({ library, slug }) => { 
  const [ tableLoaded, setTableLoaded ] = useState(false);
  const [ visibleIcons, setVisibleIcons ] = useState([]); 
  const [ categories, setCategories ] = useState<any>({});
  const [ authors, setAuthors ] = useState<any>({});

  // Search handling
  const searchBoxRef = useRef<HTMLInputElement>();
  const [ viewMode, setViewMode ] = useState('comfortable');
  const [ searchTerm, setSearchTerm ] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Library config and metadata
  const { publicRuntimeConfig: { libraries } } = getConfig();
  const libraryConfig = libraries.icons.find((c: any) => c.id === library);
  const libraryMeta = iconLibraries[library as keyof typeof iconLibraries];
  const { count: totalIcons, date: libraryReleaseDate, version: libraryVersion } = libraryMeta;

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
        const term = debouncedSearchTerm.trim().split(' ');
        const filtered = await table
          .where('st').startsWithAnyOfIgnoreCase(term)
          .distinct()
          .sortBy('n');

        setVisibleIcons(filtered);
        setTableLoaded(true);
        return;
      }
      
      const output = await table.orderBy('n').toArray();
      setVisibleIcons(output);
      setTableLoaded(true);
    };
    getIcons();
  }, [ database, debouncedSearchTerm ]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    searchBoxRef.current?.focus();
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
          <div className={classes.heading}>
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
          <div className={classes.iconLibrary}>
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
                        <Link className={classes.libraryIcon} href={`/icons/${library}/${icon.n}`}>
                          <Icon path={icon.p} size={viewSizes[viewMode as keyof typeof viewSizes]} />
                          <p>{icon.n}</p>
                        </Link>
                      )}
                      totalCount={totalIcons}
                      useWindowScroll
                    />
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
