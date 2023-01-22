import { Fragment, SyntheticEvent, useMemo, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import { ParsedUrlQuery } from 'querystring';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '@mdi/react';
import { siGithub, siTwitter } from 'simple-icons/icons';
import { mdiHeart, mdiLinkVariant } from '@mdi/js';

import { getAllContributorPaths, getContributor } from '../../utils/contributorUtils';

import useIcons from '../../hooks/useIcons';
import useWindowSize from '../../hooks/useWindowSize';

import Head from '../../components/Head/Head';
import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';
import IconGrid from '../../components/IconGrid/IconGrid';
import LibraryViewMode from '../../components/IconLibrary/LibraryViewMode';

import { ContributorProps } from '../../interfaces/contributor';
import { IconLibrary } from '../../interfaces/icons';

import classes from '../../styles/pages/contributor.module.scss';

interface ContextProps extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as ContextProps;
  const [ userId ] = slug;
  const contributor = await getContributor(userId);

  if (!contributor) {
    return { notFound: true };
  }

  return {
    props: {
      contributor,
      slug: slug.join('/')
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPaths = await getAllContributorPaths();
  const paths = allPaths.map((path) => ({ params: { slug: path.split('/') } }));
  return { fallback: false, paths };
};

interface ContributorPageProps {
  contributor: ContributorProps;
}

const ContributorPage: NextPage<ContributorPageProps> = ({ contributor }) => {
  const { authorLibraries = [], core, description, github, iconCount, id, name, sponsored, twitter, website } = contributor;

  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  const [ currentTab, setCurrentTab ] = useState(0);
  const [ viewMode, setViewMode ] = useState(isMobileWidth ? 'compact' : 'comfortable');

  const currentLibraryId = authorLibraries[currentTab];
  const currentLibrary = iconLibraries.find((library: IconLibrary) => library.id === currentLibraryId);
  const filter = useMemo(() => ({ author: github }), [ github ]);
  const visibleIcons = useIcons(currentLibraryId, filter);

  const handleChange = (event: SyntheticEvent, newValue: number) => setCurrentTab(newValue);

  return (
    <div className={classes.root}>
      <Head
        description={`Learn more about ${name}, a ${core ? 'core ' : ''}contributor to the Pictogrammers.`}
        title={`${name} - Contributor`}
      />
      <Paper className={classes.container}>
        <LandingPageHeading
          title={name}
          description={description || ''}
          graphicElement={
            <div className={classes.userInfo}>
              <Avatar
                src={`/contributors/${id}.jpg`}
                sx={{
                  backgroundColor: 'hsl(var(--primary-color))',
                  border: '3px solid hsl(var(--primary-color))',
                  fontSize: '5vh', 
                  fontWeight: 700,
                  height: 128,
                  width: 128
                }}
                title={name}
              >
                {name.split(' ').map((n)=>n[0]).join('').toUpperCase()}
              </Avatar>
              <div className={classes.links}>
                {sponsored && github && (
                  <Tooltip arrow title={`Sponsor ${name} on GitHub`}>
                    <IconButton
                      aria-label={`Sponsor ${name} on GitHub`}
                      classes={{ root: classes.sponsor }}
                      href={`https://github.com/sponsors/${github}`}
                      size='large'
                      target='_blank'
                    >
                      <Icon path={mdiHeart} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
                {github && (
                  <Tooltip arrow title={`View ${github} on GitHub`}>
                    <IconButton
                      aria-label={`View ${github} on GitHub`}
                      href={`https://github.com/${github}`}
                      size='large'
                      target='_blank'
                    >
                      <Icon path={siGithub.path} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
                {twitter && twitter !== ' ' && (
                  <Tooltip arrow title={`View ${twitter} on Twitter`}>
                    <IconButton
                      aria-label={`View ${twitter} on Twitter`}
                      href={`https://twitter.com/${twitter}`}
                      size='large'
                      target='_blank'
                    >
                      <Icon path={siTwitter.path} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
                {website && (
                  <Tooltip arrow title={`Visit ${name}'s Website`}>
                    <IconButton
                      aria-label={`Visit ${name}'s Website`}
                      href={website}
                      size='large'
                      target='_blank'
                    >
                      <Icon path={mdiLinkVariant} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          }
          hideImageOnMobile={false}
          showClouds={!isMobileWidth}
          superTitle={(
            <span className={classes.chips}>
              {core && <Chip color='primary' label='Core Contributor' />}
              {iconCount > 0 && <Chip label={`${iconCount} Icons`} />}
            </span>
          )}
        />
        <h2>Icons Authored by {name.split(' ')[0]}</h2>
        <div className={classes.iconView}>
          {!iconCount || iconCount === 0 && (
            <Alert severity='info'>
              This contributor hasn&apos;t authored any published icons, but that doesn&apos;t mean they aren&apos;t helping in other ways!
            </Alert>
          )}
          <div className={classes.controlBar}>
            <Tabs
              aria-label='Contributed Icon Libraries'
              onChange={handleChange}
              scrollButtons='auto'
              value={currentTab}
              variant='scrollable'
            >
              {authorLibraries.map((libraryId) => {
                const libInfo = iconLibraries.find((library: IconLibrary) => library.id === libraryId);
                return (
                  <Tab
                    aria-controls={`library-tab-${libraryId}`}
                    id={`library-tab-${libraryId}`}
                    key={`tab-${libraryId}`}
                    label={isMobileWidth ? libInfo.shortName : libInfo.name}
                  />
                );
              })}
            </Tabs>
            <div className={classes.viewMode}>
              <span>View:</span>
              <LibraryViewMode
                currentView={viewMode}
                compact={isMobileWidth}
                setViewMode={setViewMode}
              />
            </div>
          </div>
          <div
            role='tabpanel'
            id={`${currentLibraryId}-view`}
            aria-labelledby={`library-tab-${currentLibraryId}`}
          >
            {!visibleIcons.length ? (
              <div className={classes.loader}>
                <CircularProgress />
                Gathering up the icons...
              </div>
            ) : (
              <IconGrid
                icons={visibleIcons} 
                library={currentLibrary}
                updateUrl={false}
                viewMode={viewMode}
              />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ContributorPage;