import { Fragment, FunctionComponent, useEffect, useReducer, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { mdiHistory } from '@mdi/js';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

import { ModificationType } from '../../interfaces/enums/modificationTypes';
import { IconLibrary } from '../../interfaces/icons';
import { IconChangeRecord } from '../../interfaces/history';

import Head from '../Head/Head';
import Layout from '../Docs/Layout/Layout';
import Link from '../Link/Link';
import IconHistoryCard from './IconHistoryCard';

import iconLibraries from '../../public/data/libraries.json';

import classes from './IconLibraryHistoryView.module.scss';

const historyTypes = {
  iconAlias: [ModificationType.IconAliasCreated, ModificationType.IconAliasDeleted],
  iconCreated: [ModificationType.IconCreated],
  iconDeleted: [ModificationType.IconDeleted],
  iconModified: [ModificationType.IconModified],
  iconRenamed: [ModificationType.IconRenamed],
  iconTag: [ModificationType.IconTagCreated, ModificationType.IconTagDeleted]
};

interface IconLibraryHistoryViewProps {
  libraryInfo: IconLibrary;
}

interface FilterTypes {
  iconAlias: boolean;
  iconCreated: boolean;
  iconDeleted: boolean;
  iconModified: boolean;
  iconRenamed: boolean;
}

const IconLibraryHistoryView: FunctionComponent<IconLibraryHistoryViewProps> = ({ libraryInfo }) => {
  const [ initialLoading, setInitialLoading ] = useState(true);
  const [ loadingMore, setLoadingMore ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ data, setData ] = useState<IconChangeRecord[]>([]);
  const [ noMoreData, setNoMoreData ] = useState(false);
  const [ maxPageViewed, setMaxPageViewed ] = useState(1);
  const [ activeFilters, setActiveFilters ] = useReducer((state: FilterTypes, action: string) => {
    setInitialLoading(true);
    return { ...state, [action]: !state[action as keyof typeof state] };
  }, {
    iconAlias: false,
    iconCreated: true,
    iconDeleted: true,
    iconModified: true,
    iconRenamed: true
    // TODO: Support displaying which tag was added in the API
    // iconTag: false
  });


  const { version } = iconLibraries[libraryInfo.id as keyof typeof iconLibraries];

  useEffect(() => {
    const getHistory = async () => {
      const activeMods = Object.keys(activeFilters).reduce((output, filter) => {
        if (!!activeFilters[filter as keyof typeof activeFilters]) {
          output.push(...historyTypes[filter as keyof typeof historyTypes]);
        }
        return output;
      }, [] as string[]).join(',');

      if (activeMods === '') {
        setInitialLoading(false);
        setLoadingMore(false);
        setError(false);
        return setData([]);
      }

      try {
        const req = await fetch(`https://dev.materialdesignicons.com/api/package/${libraryInfo.packageId}/modification?modificationId=${activeMods}&page=${maxPageViewed}&size=100`);
        const json = await req.json();

        const processedData = json.map((change: IconChangeRecord) => {
          const type = Object.keys(historyTypes).find((type) => {
            return (historyTypes[type as keyof typeof historyTypes] as string[]).includes(change.modificationId);
          });
          return { ...change, type };
        });

        setInitialLoading(false);
        setLoadingMore(false);
        setError(false);

        if (!processedData.length) {
          setNoMoreData(true);
        }

        if (initialLoading) {
          return setData(processedData);
        }

        if (loadingMore) {
          return setData((d) => [...d, ...processedData]);
        }
      } catch (err) {
        setInitialLoading(false);
        setLoadingMore(false);
        setError(true);
      }
    };
    getHistory();
  }, [ activeFilters, initialLoading, libraryInfo, loadingMore, maxPageViewed ]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setMaxPageViewed(maxPageViewed + 1);
  };

  const displayItems = () => {
    const { items } = data.reduce((output: any, item: IconChangeRecord) => {
      const date = item.date.split('T')[0];
      if (date !== output.lastDate) {
        output.items.push(<h2 key={date}>Changes on {dayjs(date).format('MMMM Do, YYYY')}</h2>);
        output.lastDate = date;
      }
      output.items.push(<IconHistoryCard key={item.id} library={libraryInfo} {...item} />);
      return output;
    }, { items: [], lastDate: '' });

    if (!items.length && !error) {
      return (
        <Alert severity='warning'>
          <AlertTitle>No History Records Found</AlertTitle>
          No history records for {libraryInfo.name} were found with your selected filter criteria. Please adjust the filters and try again.
        </Alert>
      );
    }

    return (
      <Fragment>
        {items}
        {!noMoreData && !error && (
          <div className={classes.loadMore}>
            <Button
              disabled={loadingMore}
              onClick={handleLoadMore}
              startIcon={loadingMore && <CircularProgress size={18} />}
              variant='contained'
            >
              Load More
            </Button>
          </div>
        )}
      </Fragment>
    );
  };

  interface ColoredSwitchProps extends SwitchProps {
    typecolor: string;
  }

  const ColoredSwitch = styled(Switch)((props: ColoredSwitchProps) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      '&:hover': {
        backgroundColor: `hsl(var(--${props.typecolor}) / 10%)`
      },
      color: `hsl(var(--${props.typecolor}))`
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: `hsl(var(--${props.typecolor}))`
    }
  }));

  const displayFilterControls = () => {
    return (
      <div className={classes.filter}>
        <p className={classes.filterHead}>Filter History Items</p>
        <FormGroup>
          <FormControlLabel
            control={<ColoredSwitch checked={activeFilters.iconCreated} onChange={() => setActiveFilters('iconCreated')} {...{typecolor: 'green'}} />}
            label='Icon Created'
          />
          <FormControlLabel
            control={<ColoredSwitch checked={activeFilters.iconModified} onChange={() => setActiveFilters('iconModified')} {...{typecolor: 'orange'}} />}
            label='Icon Modified'
          />
          <FormControlLabel
            control={<ColoredSwitch checked={activeFilters.iconRenamed} onChange={() => setActiveFilters('iconRenamed')} {...{typecolor: 'light-purple'}} />}
            label='Icon Renamed'
          />
          <FormControlLabel
            control={<ColoredSwitch checked={activeFilters.iconDeleted} onChange={() => setActiveFilters('iconDeleted')} {...{typecolor: 'red'}} />}
            label='Icon Deleted'
          />
          <FormControlLabel
            control={<ColoredSwitch checked={activeFilters.iconAlias} onChange={() => setActiveFilters('iconAlias')} {...{typecolor: 'blue'}} />}
            label='Icon Aliased'
          />
        </FormGroup>
      </div>
    );
  };

  return (
    <Layout
      breadcrumbs={[
        <Link key='libraries' href='/libraries/'>Icons & Fonts</Link>,
        <Link key={libraryInfo.id} href={`/library/${libraryInfo.id}`}>{libraryInfo.name}</Link>
      ]}
      icon={mdiHistory}
      sidebarContent={displayFilterControls()}
      title='History'
    >
      <Head
        description={`View historical data for ${libraryInfo.name}.`}
        title={`History - ${libraryInfo.name}`}
      />
      <Alert severity='info'>
        History information provided here happens in real-time. Changes you see below may have occurred after the release of {libraryInfo.name} v{version}. Check the <Link href={`/docs/library/${libraryInfo.id}/releases/changelog`}>changelog</Link> for more information.
      </Alert>
      {initialLoading ? (
        <div className={classes.loader}>
          <CircularProgress />
          Loading {libraryInfo.name} History...
        </div>
      ) : (
        <div className={classes.historyList}>
          {error && (
            <Alert severity='error'>
              <AlertTitle>Unable to Retrieve Library History</AlertTitle>
              An error occurred attempting to retrieve the history for {libraryInfo.name}. Please try again.
            </Alert>
          )}
          {displayItems()}
        </div>
      )}
    </Layout>
  );
};

export default IconLibraryHistoryView;