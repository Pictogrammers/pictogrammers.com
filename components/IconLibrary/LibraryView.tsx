import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import cx from 'clsx';
import { VirtuosoGrid } from 'react-virtuoso';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mdi/react';
import {
  mdiAlertCircleOutline,
  mdiApps,
  mdiCloseCircle,
  mdiFormatListBulleted,
  mdiMagnify,
  mdiViewGrid
} from '@mdi/js';

import { IconLibraryIcon } from '../../interfaces/icons';

import useProvisionDatabase from '../../hooks/useProvisionDatabase';
import useDebounce from '../../hooks/useDebounce';

import LibraryMenu from './LibraryMenu';

import iconLibraries from '../../public/libraries/libraries.json';

import classes from './LibraryView.module.scss';

interface LibraryViewProps {
  library: string;
  slug: string;
}

const viewModes = {
  comfortable: {
    icon: mdiViewGrid,
    iconSize: 2,
    name: 'Comfortable'
  },
  compact: {
    icon: mdiApps,
    iconSize: 1.2,
    name: 'Compact'
  },
  list: {
    icon: mdiFormatListBulleted,
    iconSize: .8,
    name: 'List'
  }
};

const LibraryView: FunctionComponent<LibraryViewProps> = ({ library, slug }) => { 
  const [ database, setDatabase ] = useState<any>(null);
  const [ tableLoaded, setTableLoaded ] = useState(false);
  const [ visibleIcons, setVisibleIcons ] = useState([]); 
  const [ viewMode, setViewMode ] = useState('comfortable');
  const [ searchTerm, setSearchTerm ] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { publicRuntimeConfig: { libraries } } = getConfig();
  const libraryConfig = libraries.icons.find((c: any) => c.id === library);

  const libraryMeta = iconLibraries[library as keyof typeof iconLibraries];
  const { count: totalIcons, date: libraryReleaseDate, version: libraryVersion } = libraryMeta;

  useProvisionDatabase(library, setDatabase);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
              <LibraryMenu selectedLibrary={libraryConfig} />
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
                      onClick={() => setSearchTerm('')}
                      position='end'
                      sx={{
                        cursor: searchTerm !== '' ? 'pointer' : 'default'
                      }}
                    >
                      {searchTerm !== '' && <Icon path={mdiCloseCircle} size={1} />}
                      {searchTerm === '' && <Icon path='' size={1} />}
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon path={mdiMagnify} size={1} />
                    </InputAdornment>
                  )
                }}
                onChange={handleSearchChange}
                placeholder={`Search ${totalIcons} icons...`}
                size='small'
                value={searchTerm}
                variant='outlined'
              />
              <ButtonGroup variant='outlined' aria-label='View Mode'>
                {Object.keys(viewModes).map((mode) => (
                  <Tooltip key={mode} title={viewModes[mode as keyof typeof viewModes].name}>
                    <Button
                      onClick={() => setViewMode(mode)}
                      variant={viewMode === mode ? 'contained' : 'outlined'}
                    >
                      <Icon path={viewModes[mode as keyof typeof viewModes].icon} size={1} />
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
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
                  <p>Side Nav</p>
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
                          <Icon path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} />
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
