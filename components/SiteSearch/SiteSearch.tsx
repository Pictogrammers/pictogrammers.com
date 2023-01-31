import { FunctionComponent, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import ExportedImage from 'next-image-export-optimizer';
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
import { mdiAlertOutline, mdiBookOpenPageVariantOutline, mdiCreation, mdiDotsHorizontalCircleOutline, mdiMagnify } from '@mdi/js';

import Link from '../Link/Link';
import CustomGridIcon from '../CustomGridIcon/CustomGridIcon';

import { useData } from '../../providers/DataProvider';
import useDebounce from '../../hooks/useDebounce';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';
import { Doc } from '../../interfaces/doc';
import { ContributorProps } from '../../interfaces/contributor';

import classes from './SiteSearch.module.scss';

interface SearchResultsProps {
  id: string;
  libraryInfo?: IconLibrary;
  results: IconLibraryIcon[];
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

    const results = Object.keys(allResults).reduce((output, key) => {
      if (!allResults[key].length) {
        return output;
      }

      if (['contributors', 'docs'].includes(key)) {
        output.push({ id: key, results: allResults[key] });
        return output;
      }

      const libraryInfo = librariesMeta.icons.find((library: IconLibrary) => library.id === key);
      output.push({ id: key, libraryInfo, results: allResults[key] });
      return output;
    }, [] as SearchResultsProps[]);

    setSearchResults(results.length ? results : [{ id: 'no-results', results: [] }]);
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
        getOptionLabel={(option: any) => option.id}
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
        renderOption={(props, option: SearchResultsProps) => {
          if (option.id === 'no-results') {
            return (
              <div className={classes.results} key='no-results'>
                <List classes={{ root: classes.group }} dense>
                  <ListItem key='no-results'>
                    <Icon path={mdiAlertOutline} size={1} />
                    <ListItemText>No results found.</ListItemText>
                  </ListItem>
                </List>
              </div>
            );
          }

          if (!option.results.length) {
            return null;
          }

          const isLibrary = !!option.libraryInfo;
          const showMoreLink = option.results.length > 10;
          const limitedResults = option.results.slice(0, 10);
          const groupName = isLibrary ? option?.libraryInfo?.name : option.id === 'docs' ? 'Docs' : 'Contributors';

          return (
            <div className={classes.results} key={option.id}>
              <ListSubheader classes={{ root: classes.groupHeader }}>{groupName}</ListSubheader>
              <List classes={{ root: classes.group }} dense sx={{ padding: '0 0 .5rem' }}>
                {limitedResults.map((result: any) => {
                  const link = isLibrary ? `/library/${option.id}/icon/${result.n}` : option.id === 'docs' ? `/docs/${result.slug}` : `/contributor/${result.github}`;
                  const title = isLibrary ? result.n : option.id === 'docs' ? result.title : result.name;
                  const icon = isLibrary ? result.p : mdiBookOpenPageVariantOutline;
                  const isNew = isLibrary && option.libraryInfo?.version === result.v;
                  return (
                    <ListItem key={result.cp || result.slug} sx={{ padding: 0 }}>
                      <ListItemButton component={Link} href={link} onClick={closeSearchResults}>
                        {option.id !== 'contributors' ? (
                          <CustomGridIcon gridSize={option?.libraryInfo?.gridSize || 24} path={icon} size={1} />
                        ) : (
                          <Avatar
                            classes={{ root: classes.avatar }}
                            sx={{
                              background: `hsl(var(${result.core ? '--primary-color' : '--dark-cyan'}))`,
                              border: `2px solid hsl(var(${result.core ? '--primary-color' : '--dark-cyan'}))`,
                              height: 32,
                              width: 32
                            }}
                          >
                            {result.image ? (
                              <ExportedImage
                                alt={result.name}
                                height={32}
                                placeholder='empty'
                                src={`/images/contributors/${result.id}.jpg`}
                                width={32}
                              />
                            ) : result.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </Avatar>
                        )}
                        <ListItemText>
                          {title}
                          {!!isLibrary ? (
                            <span className={classes.subtext}>{isNew ? <strong className={classes.new}><Icon path={mdiCreation} size={.5} />New! </strong> : ''}Added in v{result.v}</span>
                          ) : option.id !== 'contributors' ? (
                            <span className={classes.subtext}>{result.library ? `${result.library} • ` : ''}{result.category}</span>
                          ) : (
                            <span className={classes.subtext}>{result.core ? 'Core Member' : 'Community Contributor'}{!!result.contributedRepos?.length ? ' • Code Contributor' : ''}</span>
                          )}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {isLibrary && showMoreLink && (
                  <ListItemButton component={Link} href={`/library/${option.id}/?q=${encodeURIComponent(debouncedSearchTerm)}`} onClick={closeSearchResults}>
                    <Icon path={mdiDotsHorizontalCircleOutline} size={1} />
                    <ListItemText>See All Results</ListItemText>
                  </ListItemButton>
                )}
              </List>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SiteSearch;