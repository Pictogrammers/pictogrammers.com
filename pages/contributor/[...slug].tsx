import { Fragment, SyntheticEvent, useMemo, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import cx from 'clsx';
import { ParsedUrlQuery } from 'querystring';
import ExportedImage from 'next-image-export-optimizer';
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
import { mdiHeart, mdiLinkVariant, mdiPaletteSwatch, mdiSourceBranch } from '@mdi/js';

import { getAllContributorPaths, getContributor } from '../../utils/contributorUtils';

import useIcons from '../../hooks/useIcons';
import useWindowSize from '../../hooks/useWindowSize';

import Head from '../../components/Head/Head';
import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../../components/LandingPageCard/LandingPageCard';
import IconGrid from '../../components/IconGrid/IconGrid';
import LibraryViewMode from '../../components/IconLibrary/LibraryViewMode';

import { ContributorProps } from '../../interfaces/contributor';
import { IconLibrary } from '../../interfaces/icons';

import PictogrammerMonogram from '../../public/images/brand/logos/pictogrammers-monogram-white.svg';
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
  const { authorLibraries = [], contributedRepos, core, description, github, iconCount, id, image, name, sponsored, twitter, website } = contributor;

  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  const [ currentTab, setCurrentTab ] = useState(0);
  const [ viewMode, setViewMode ] = useState(isMobileWidth ? 'compact' : 'comfortable');

  const currentLibraryId = authorLibraries[currentTab];
  const currentLibrary = iconLibraries.find((library: IconLibrary) => library.id === currentLibraryId);
  const filter = useMemo(() => ({ author: github }), [ github ]);
  const visibleIcons = useIcons(currentLibraryId, filter);
  const contributorColor = core ? '--primary-color' : '--dark-cyan';

  const handleChange = (event: SyntheticEvent, newValue: number) => setCurrentTab(newValue);

  return (
    <div className={classes.root}>
      <Head
        description={`Learn more about ${name}, a ${core ? 'core ' : ''}member of the Pictogrammers.`}
        title={`${name} - Contributor`}
      />
      <Paper className={cx(classes.container, {
        [classes.core]: !!core
      })}>
        <LandingPageHeading
          color={contributorColor}
          className={classes.header}
          title={name}
          description={description || ''}
          graphicElement={
            <div className={classes.userInfo}>
              <Avatar
                sx={{
                  backgroundColor: `hsl(var(${contributorColor}))`,
                  border: `3px solid hsl(var(${contributorColor}))`,
                  fontSize: '5vh',
                  fontWeight: 700,
                  height: 128,
                  width: 128
                }}
              >
                {image ? (
                  <ExportedImage
                    alt={name}
                    height={128}
                    placeholder='empty'
                    src={`/images/contributors/${id}.jpg`}
                    width={128}
                  />
                ) : name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
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
                {github && github !== 'contributors' && (
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
              {core && <Chip color='primary' label='Core Member' icon={<PictogrammerMonogram style={{ height: '1.6rem', marginLeft: '.5rem', width: '1.6rem' }} />} />}
              {iconCount > 0 && <Chip label={`${iconCount} Icon${iconCount === 0 || iconCount > 1 ? 's' : ''}`} icon={<Icon path={mdiPaletteSwatch} size={.8} style={{ marginLeft: '.75rem' }} />} />}
              {!!contributedRepos.length && <Chip label='Code Contributor' icon={<Icon path={mdiSourceBranch} size={.8} style={{ marginLeft: '.75rem' }} />} />}
            </span>
          )}
        />
        {!!contributedRepos.length && (
          <Fragment>
            <h2>Contributed Repositories</h2>
            <div className={classes.repos}>
              {contributedRepos.map((repo) => {
                return (
                  <LandingPageCard
                    color={contributorColor}
                    description=''
                    fullWidth
                    key={repo}
                    headerElement='h3'
                    href={`https://github.com/Pictogrammers/${repo}`}
                    icon={siGithub.path}
                    superTitle='Pictogrammers/'
                    title={repo}
                  />
                );
              })}
            </div>
          </Fragment>
        )}
        <h2>Icons Authored</h2>
        <div className={classes.iconView}>
          {!iconCount || iconCount === 0 ? (
            <Alert severity='info'>
              This contributor hasn&apos;t authored any published icons, but that doesn&apos;t mean they aren&apos;t helping in other ways!
            </Alert>
          ) : (
            <Fragment>
              <div className={classes.controlBar}>
                <Tabs
                  aria-label='Contributed Icon Libraries'
                  onChange={handleChange}
                  scrollButtons='auto'
                  TabIndicatorProps={{ style: { background: `hsl(var(${contributorColor}))` } }}
                  value={currentTab}
                  variant='scrollable'
                >
                  {authorLibraries.map((libraryId) => {
                    const libInfo = iconLibraries.find((library: IconLibrary) => library.id === libraryId);
                    return (
                      <Tab
                        aria-controls={`library-tab-${libraryId}`}
                        classes={{
                          selected: !core ? classes.selectedTab : undefined,
                          textColorPrimary: !core ? classes.tab : undefined
                        }}
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
                    color={core ? 'primary' : 'secondary'}
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
                    <CircularProgress color={core ? 'primary' : 'secondary'} />
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
            </Fragment>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default ContributorPage;