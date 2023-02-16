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
import { mdiAlertOctagonOutline, mdiAlertOutline, mdiBookOpenPageVariantOutline, mdiCreation, mdiDotsHorizontalCircleOutline, mdiMagnify } from '@mdi/js';

import Link from '@/components/Link/Link';
import CustomGridIcon from '@/components/CustomGridIcon/CustomGridIcon';

import { useData } from '@/providers/DataProvider';
import useDebounce from '@/hooks/useDebounce';

import { IconLibrary, IconLibraryIcon } from '@/interfaces/icons';
import { Doc } from '@/interfaces/doc';
import { ContributorProps } from '@/interfaces/contributor';

import classes from './SiteSearch.module.scss';

interface SearchResultProps {
  id: string;
  libraryInfo?: IconLibrary;
  results: IconLibraryIcon[];
  showMore?: boolean;
  type?: string;
  visible: number;
}

interface SearchResultsProps {
  results: SearchResultProps[];
  totalResults: number;
}

const SiteSearch: FunctionComponent = () => {
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ searchResults, setSearchResults ] = useState<SearchResultsProps>({ results: [], totalResults: 0 });
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
      return setSearchResults({ results: [], totalResults: 0 });
    }

    const libraryResults = searchLibraries(debouncedSearchTerm);
    const docs = searchDocs(debouncedSearchTerm);
    const contributors = searchContributors(debouncedSearchTerm);
    // eslint-disable-next-line sort-keys
    const allResults = { ...libraryResults, docs, contributors };

    const results = Object.keys(allResults).reduce((output: SearchResultsProps, key) => {
      if (!allResults[key].length) {
        return output;
      }

      const limitedResults = allResults[key].slice(0, 10);

      if (['contributors', 'docs'].includes(key)) {
        output.results.push({
          id: key,
          results: limitedResults,
          type: key,
          visible: limitedResults.length
        });
        output.totalResults += limitedResults.length;
        return output;
      }

      const libraryInfo = librariesMeta.icons.find((library: IconLibrary) => library.id === key);
      const showMore = allResults[key].length > 10;
      output.results.push({
        id: key,
        libraryInfo,
        results: limitedResults,
        showMore,
        type: 'icons',
        visible: limitedResults.length + (showMore ? 1 : 0)
      });
      output.totalResults += limitedResults.length + (showMore ? 1 : 0);
      return output;
    }, {
      results: [],
      totalResults: 0
    });

    setSearchResults(results.totalResults ? results : { results: [{ id: 'no-results', results: [], visible: 0 }], totalResults: 0 });
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

  const renderIconResult = (option: SearchResultProps, result: IconLibraryIcon, index: number) => {
    return (
      <ListItem disablePadding key={index}>
        <ListItemButton
          component={Link}
          href={`/library/${option.id}/icon/${result.n}`}
          onClick={closeSearchResults}
        >
          <CustomGridIcon
            gridSize={option?.libraryInfo?.gridSize || 24}
            path={result.p}
            size={1}
          />
          <ListItemText>
            {result.n}
            <span className={classes.subtext}>
              {!!result.d ? (
                <strong className={classes.deprecated}><Icon path={mdiAlertOctagonOutline} size={.5} />DEPRECATED </strong>
              ) : option.libraryInfo?.version === result.v ? (
                <strong className={classes.new}><Icon path={mdiCreation} size={.5} />New! </strong>
              ) : ''}
              Added in v{result.v}
            </span>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  const renderDocsResult = (option: SearchResultProps, result: any, index: number) => {
    return (
      <ListItem disablePadding key={index}>
        <ListItemButton
          component={Link}
          href={`/docs/${result.slug}`}
          onClick={closeSearchResults}
        >
          <Icon path={mdiBookOpenPageVariantOutline} size={1} />
          <ListItemText>
            {result.title}
            <span className={classes.subtext}>
              {result.library ? `${result.library} • ` : ''}{result.category}
            </span>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  const renderContributorResult = (option: SearchResultProps, result: any, index: number) => {
    return (
      <ListItem disablePadding key={index}>
        <ListItemButton
          component={Link}
          href={`/contributor/${result.github}`}
          onClick={closeSearchResults}
        >
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
          <ListItemText>
            {result.name}
            <span className={classes.subtext}>
              {result.core ? 'Core Member' : 'Community Contributor'}{!!result.contributedRepos?.length ? ' • Code Contributor' : ''}
            </span>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
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
        options={searchResults.results}
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
        renderOption={(props, option: SearchResultProps, { index: groupIndex }) => {
          if (option.id === 'no-results') {
            return (
              <div className={classes.results} key='no-results'>
                <List classes={{ root: classes.group }} dense>
                  <ListItem key='no-results-list'>
                    <Icon path={mdiAlertOutline} size={1} />
                    <ListItemText>No results found.</ListItemText>
                  </ListItem>
                </List>
              </div>
            );
          }

          if (!option.visible) {
            return null;
          }

          const groupName = option.type === 'icons' ? option?.libraryInfo?.name : option.type === 'docs' ? 'Docs' : 'Contributors';
          const groupRenderer = option.type === 'icons' ? renderIconResult : option.type === 'docs' ? renderDocsResult : renderContributorResult;
          const groupLength = Math.min(option.results.length || 0, 10);
          const lastGroupLength = searchResults.results[groupIndex - 1]?.visible || 0;
          const lastGroupIndex = Math.min(lastGroupLength, searchResults.results[groupIndex - 1]?.showMore ? 11 : 10) * groupIndex;

          return (
            <div className={classes.results} key={option.id}>
              <ListSubheader classes={{ root: classes.groupHeader }}>{groupName}</ListSubheader>
              <List classes={{ root: classes.group }} dense sx={{ padding: '0 0 .5rem' }}>
                {option.results.map((result: any, index) => groupRenderer(option, result, index + lastGroupIndex))}
                {option.showMore && (
                  <ListItem disablePadding key={lastGroupIndex + groupLength}>
                    <ListItemButton
                      component={Link}
                      href={`/library/${option.id}/?q=${encodeURIComponent(debouncedSearchTerm)}`}
                      onClick={closeSearchResults}
                    >
                      <Icon path={mdiDotsHorizontalCircleOutline} size={1} />
                      <ListItemText>See All Results</ListItemText>
                    </ListItemButton>
                  </ListItem>
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