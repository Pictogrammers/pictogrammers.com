import { FunctionComponent, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import getConfig from 'next/config';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import uFuzzy from '@leeoniya/ufuzzy';
import Icon from '@mdi/react';
import { mdiBookOpenPageVariantOutline, mdiMagnify } from '@mdi/js';

import { useData } from '../../providers/DataProvider';
import useDebounce from '../../hooks/useDebounce';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import classes from './SiteSearch.module.scss';

interface SearchOptionProps {
  cp?: string;
  library?: string;
  n?: string;
  p?: string;
  slug?: string;
  st?: string[];
  title?: string;
  type?: string;
}

const SiteSearch: FunctionComponent = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchResults, setSearchResults ] = useState<SearchOptionProps[]>([]);
  const [ searchOptions, setSearchOptions ] = useState<SearchOptionProps[]>([]);
  const { publicRuntimeConfig: { libraries: librariesMeta } } = getConfig();
  const { docs, libraries } = useData();
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 250);

  useEffect(() => {
    const iconOptions = Object.keys(libraries).reduce((output: any, libraryId) => {
      output.push(...libraries[libraryId].icons.map((i: IconLibraryIcon) => ({ ...i, library: libraryId, type: 'icon' })));
      return output;
    }, []);

    const docOptions = docs.map((doc: any) => ({ ...doc, type: 'zDoc' }));
    setSearchOptions([...iconOptions, ...docOptions]);
  }, [ docs, libraries ]);

  useEffect(() => {
    if (debouncedSearchTerm === '' || !searchOptions.length) {
      return setSearchResults([]);
    }

    const uf = new uFuzzy({});

    const haystack = searchOptions.map((option) => {
      if (option.st) {
        return option.st.join('¦');
      }
      return Object.values(option).join('¦');
    });
    const needle = debouncedSearchTerm;

    const idxs = uf.filter(haystack, needle);
    const info = uf.info(idxs, haystack, needle);
    const order = uf.sort(info, haystack, needle);
    const output = order.map((position) => searchOptions[info.idx[position]]);

    setSearchResults(output);
  }, [ debouncedSearchTerm, searchOptions ]);

  return (
    <div className={classes.root}>
      <Autocomplete
        blurOnSelect
        classes={{ popper: classes.menu }}
        clearOnBlur={false}
        freeSolo
        fullWidth
        options={searchResults}
        getOptionLabel={(option: any) => {
          return option.n || option.title;
        }}
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
                borderRadius: '25px'
              }
            }}
            placeholder='Search'
            size='small'
            variant='outlined'
          />
        )}
        filterOptions={(options) => {
          return options.sort((a: any, b: any) =>  a?.type?.localeCompare(b?.type) || a?.library?.localeCompare(b?.library));
        }}
        groupBy={(option: any) => {
          if (option.type === 'icon') {
            return librariesMeta.icons.find((lib: IconLibrary) => lib.id === option.library).name;
          }
          return 'docs';
        }}
        renderGroup={(params) => {
          return (
            <List classes={{ root: classes.group }} dense sx={{ padding: '0 0 1rem' }}>
              <h3 className={classes.groupHeader}>{params.group}</h3>
              {(params.children as ReactNode[]).slice(0, 10)}
            </List>
          );
        }}
        renderOption={(props, option) => {
          if (option.type === 'icon') {
            return (
              <ListItemButton component={Link} href={`/library/${option.library}/icon/${option.n}`} key={option.cp}>
                <Icon path={option.p || ''} size={1} />
                <ListItemText>{option.n}</ListItemText>
              </ListItemButton>
            );
          }

          return (
            <ListItemButton component={Link} href={`/docs/${option.slug}`} key={option.slug}>
              <Icon path={mdiBookOpenPageVariantOutline} size={1} />
              <ListItemText>{option.title}</ListItemText>
            </ListItemButton>
          );
        }}
        sx={{ width: 300 }}
        onInputChange={(e: SyntheticEvent, value: string) => setSearchTerm(value)}
      />
    </div>
  );
};

export default SiteSearch;