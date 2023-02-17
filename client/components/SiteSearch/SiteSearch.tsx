import { Fragment, FunctionComponent, ReactNode, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import ExportedImage from 'next-image-export-optimizer';
import cx from 'clsx';
import Autocomplete from '@mui/material/Autocomplete';
import Popper, { PopperProps } from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import uFuzzy from '@leeoniya/ufuzzy';
import Icon from '@mdi/react';
import { mdiAlertOctagonOutline, mdiAlertOutline, mdiBookOpenPageVariantOutline, mdiCreation, mdiDotsHorizontalCircleOutline, mdiMagnify } from '@mdi/js';

import Link from '@/components/Link/Link';
import CustomGridIcon from '@/components/CustomGridIcon/CustomGridIcon';

import { useData } from '@/providers/DataProvider';
import useDebounce from '@/hooks/useDebounce';

import { IconLibrary, IconLibraryIcon } from '@/interfaces/icons';
import { Doc } from '@/interfaces/doc';
import { ContributorProps } from '@/interfaces/contributor';

import classes from './SiteSearch.module.scss';

interface SearchResultsProps {
  href: string;
  image: {
    color?: string;
    gridSize?: number;
    path?: string;
    src?: string;
    type: string;
  }
  key?: any;
  subtitle?: ReactNode | string;
  title: string;
  type: string;
}

const SiteSearch: FunctionComponent = () => {
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ searchResults, setSearchResults ] = useState<SearchResultsProps[]>([]);
  const [ searchResultsVisible, setSearchResultsVisible ] = useState(false);
  const { publicRuntimeConfig: { libraries: librariesMeta } } = getConfig();
  const { contributors, docs, libraries } = useData();
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const searchLibraries = useCallback((searchTerm: string) => {
    return Object.keys(libraries).reduce((output: any, libraryId: string) => {
      const uf = new uFuzzy({});
      const haystack = libraries[libraryId].icons.map((icon: IconLibraryIcon) => icon.st.join('¦'));
      const idxs = uf.filter(haystack, searchTerm);
      const info = uf.info(idxs, haystack, searchTerm);
      const order = uf.sort(info, haystack, searchTerm);
      output[libraryId] = order.map((position) => libraries[libraryId].icons[info.idx[position]]);
      return output;
    }, {});
  }, [ libraries ]);

  const searchDocs = useCallback((searchTerm: string) => {
    const uf = new uFuzzy({});
    const haystack = docs.map((doc: Doc) => Object.values(doc).join('¦'));
    const idxs = uf.filter(haystack, searchTerm);
    const info = uf.info(idxs, haystack, searchTerm);
    const order = uf.sort(info, haystack, searchTerm);
    return order.map((position) => docs[info.idx[position]]);
  }, [ docs ]);

  const searchContributors = useCallback((searchTerm: string) => {
    const uf = new uFuzzy({});
    const haystack = contributors.map((contributor: ContributorProps) => `${contributor.name}¦${contributor.github}`);
    const idxs = uf.filter(haystack, searchTerm);
    const info = uf.info(idxs, haystack, searchTerm);
    const order = uf.sort(info, haystack, searchTerm);
    return order.map((position) => contributors[info.idx[position]]);
  }, [ contributors ]);

  const CustomPopper = useCallback((props: PopperProps) => {
    return (
      <Popper
        {...props}
        placement='bottom-end'
        sx={{ width: '500px !important' }}
      />
    );
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm === '') {
      return setSearchResults([]);
    }

    const libraryResults = searchLibraries(debouncedSearchTerm);
    const docs = searchDocs(debouncedSearchTerm);
    const contributors = searchContributors(debouncedSearchTerm);
    // eslint-disable-next-line sort-keys
    const allResults = { ...libraryResults, docs, contributors };

    const { results } = Object.keys(allResults).reduce((output: any, key) => {
      if (!allResults[key].length) {
        return output;
      }

      const limitedResults = allResults[key].slice(0, 10);

      switch (key) {
        case 'contributors':
          output.results.push({ title: 'Contributors', type: 'header' });
          output.results.push(...limitedResults.map((result: any) => {
            return {
              href: `/contributor/${result.github}`,
              image: {
                color: `hsl(var(${result.core ? '--primary-color' : '--dark-cyan'}))`,
                src: result.image ? `/images/contributors/${result.id}.jpg` : undefined,
                type: 'avatar'
              },
              key: output.iterator++,
              subtitle: `${result.core ? 'Core Member' : 'Community Contributor'}${!!result.contributedRepos?.length ? ' • Code Contributor' : ''}`,
              title: result.name
            };
          }));
          return output;
        case 'docs':
          output.results.push({ title: 'Documentation', type: 'header' });
          output.results.push(...limitedResults.map((result: any) => {
            return {
              href: `/docs/${result.slug}`,
              image: {
                path: mdiBookOpenPageVariantOutline,
                type: 'icon'
              },
              key: output.iterator++,
              subtitle: `${result.library ? `${result.library} • ` : ''}${result.category}`,
              title: result.title
            };
          }));
          return output;
        default:
          const libraryInfo = librariesMeta.icons.find((library: IconLibrary) => library.id === key);
          output.results.push({ title: libraryInfo.name, type: 'header' });
          output.results.push(...limitedResults.map((result: any) => {
            return {
              href: `/library/${key}/icon/${result.n}`,
              image: {
                gridSize: libraryInfo?.gridSize,
                path: result.p,
                type: 'icon'
              },
              key: output.iterator++,
              subtitle: (
                <Fragment>
                  {!!result.d ? (
                    <strong className={classes.deprecated}><Icon path={mdiAlertOctagonOutline} size={.5} />DEPRECATED </strong>
                  ) : libraryInfo?.version === result.v ? (
                    <strong className={classes.new}><Icon path={mdiCreation} size={.5} />New! </strong>
                  ) : ''}
                  Added in v{result.v}
                </Fragment>
              ),
              title: result.n
            };
          }));

          if (allResults[key].length > 10) {
            output.results.push({
              href: `/library/${key}/?q=${encodeURIComponent(debouncedSearchTerm)}`,
              image: {
                path: mdiDotsHorizontalCircleOutline,
                type: 'icon'
              },
              key: output.iterator++,
              title: `View All ${libraryInfo.name} Results...`,
              type: 'view-more'
            });
          }
          return output;
      }
    }, {
      iterator: 0,
      results: []
    });

    if (!results.length) {
      return setSearchResults([{
        href: '#',
        image: {
          path: mdiAlertOutline,
          type: 'icon'
        },
        title: 'No results found.',
        type: 'no-results'
      }]);
    }

    setSearchResults(results);
  }, [
    debouncedSearchTerm,
    librariesMeta.icons,
    searchContributors,
    searchDocs,
    searchLibraries
  ]);

  const openSearchResults = () => setSearchResultsVisible(true);
  const closeSearchResults = () => {
    searchBoxRef?.current?.blur();
    setSearchResultsVisible(false);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        classes={{ paper: classes.menuPaper }}
        clearOnBlur={false}
        filterOptions={(options) => options}
        freeSolo
        fullWidth
        getOptionLabel={(option: any) => option.id || searchTerm}
        onInputChange={(e: SyntheticEvent, value: string) => setSearchTerm(value)}
        onClose={closeSearchResults}
        onOpen={openSearchResults}
        open={searchResultsVisible}
        options={searchResults}
        PopperComponent={CustomPopper}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{ root: classes.searchBox }}
            InputProps={{
              ...params.InputProps,
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation();
                }
              },
              startAdornment: (
                <InputAdornment position='start' sx={{ marginLeft: '5px', marginRight: 0 }}>
                  <Icon path={mdiMagnify} size={1} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'hsl(var(--white))',
                borderRadius: '24px'
              }
            }}
            placeholder='Search Pictogrammers.com'
            inputRef={searchBoxRef}
            size='small'
            variant='outlined'
          />
        )}
        ListboxComponent={List}
        ListboxProps={{
          classes: {
            root: classes.results
          }
        } as any}
        renderOption={(props, option) => {
          if (option.type === 'no-results') {
            return (
              <Fragment>
                <ListSubheader classes={{ root: classes.header }} key='no-results-header'>Search Results</ListSubheader>
                <ListItem key='no-results'>
                  <Icon path={mdiAlertOutline} size={1} />
                  <ListItemText>No results found.</ListItemText>
                </ListItem>
              </Fragment>
            );
          }

          if (option.type === 'header') {
            return <ListSubheader classes={{ root: classes.header }} key={option.title}>{option.title}</ListSubheader>;
          }

          return (
            <ListItem disablePadding key={option.key}>
              <ListItemButton
                classes={{
                  root: cx(classes.result, {
                    [classes.more]: option.type === 'view-more'
                  })
                }}
                component={Link}
                href={option.href}
                onClick={closeSearchResults}
              >
                {option.image.type === 'icon' && option.image.path ? (
                  <CustomGridIcon
                    gridSize={option.image.gridSize || 24}
                    path={option.image.path}
                    size={1}
                  />
                ) : option.image.type === 'avatar' ? (
                  <Avatar
                    classes={{ root: classes.avatar }}
                    sx={{
                      background: option.image.color,
                      border: `2px solid ${option.image.color}))`,
                      height: 32,
                      width: 32
                    }}
                  >
                    {option.image.src ? (
                      <ExportedImage
                        alt={option.title}
                        height={32}
                        placeholder='empty'
                        src={option.image.src}
                        width={32}
                      />
                    ) : option.title.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </Avatar>
                ) : null}
                <ListItemText>
                  {option.title}
                  {option.subtitle && <span className={classes.subtext}>{option.subtitle}</span>}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        }}
      />
    </div>
  );
};

export default SiteSearch;