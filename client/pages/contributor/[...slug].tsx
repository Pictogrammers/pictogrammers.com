import { Fragment, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import Image from 'next/image';
import cx from 'clsx';
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
import { siGithub, siMastodon, siTwitter } from 'simple-icons';
import { mdiHeart, mdiLinkVariant, mdiPaletteSwatch, mdiSourceBranch } from '@mdi/js';

import { getAllContributorPaths, getContributor } from '@/utils/contributorUtils';

import useIcons from '@/hooks/useIcons';
import useWindowSize from '@/hooks/useWindowSize';

import Head from '@/components/Head/Head';
import LandingPageHeading from '@/components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '@/components/LandingPageCard/LandingPageCard';
import IconGrid from '@/components/IconGrid/IconGrid';
import LibraryViewMode from '@/components/IconLibrary/LibraryViewMode';

import { ContributorProps } from '@/interfaces/contributor';
import { IconLibrary } from '@/interfaces/icons';

import PictogrammerMonogram from '@/public/images/brand/logos/pictogrammers-monogram-white.svg';
import classes from '@/styles/pages/contributor.module.scss';

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

const linkDefinitions = {
  mastodon: {
    icon: siMastodon.path,
    title: (value: string) => `View ${value} on Mastodon`
  },
  twitter: {
    icon: siTwitter.path,
    title: (value: string) => `View ${value} on Twitter`
  },
  website: {
    icon: mdiLinkVariant,
    title: (value: string) => `Visit ${value}'s Website`
  }
} as any;

const ContributorPage: NextPage<ContributorPageProps> = ({ contributor }) => {
  const { authorLibraries = [], avatar, contributedRepos, core, description, github, iconCount, links = [], name, sponsorable } = contributor;

  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width > 0 && windowSize.width <= parseInt(classes['mobile-width']);

  const [ currentTab, setCurrentTab ] = useState(0);
  const [ viewMode, setViewMode ] = useState('default');

  const currentLibraryId = authorLibraries[currentTab];
  const currentLibrary = iconLibraries.find((library: IconLibrary) => library.id === currentLibraryId);
  const filter = useMemo(() => ({ author: github }), [ github ]);
  const visibleIcons = useIcons(currentLibraryId, filter);
  const contributorColor = core ? '--primary-color' : '--dark-cyan';

  const handleChange = (event: SyntheticEvent, newValue: number) => setCurrentTab(newValue);

  useEffect(() => {
    if (isMobileWidth) {
      setViewMode('comfortable');
    }
  }, [ isMobileWidth ]);

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
                {avatar ? (
                  <Image
                    alt={name}
                    height={128}
                    placeholder='empty'
                    src={avatar}
                    width={128}
                  />
                ) : name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </Avatar>
              <div className={classes.links}>
                {sponsorable && github && (
                  <Tooltip arrow title={`Sponsor ${name} on GitHub`}>
                    <IconButton
                      aria-label={`Sponsor ${name} on GitHub`}
                      classes={{ root: classes.sponsor }}
                      href={`https://github.com/sponsors/${github}`}
                      rel='nofollow me'
                      size='large'
                      target='_blank'
                    >
                      <Icon path={mdiHeart} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
                {github && github !== 'contributors' && (
                  <Tooltip arrow title={`View ${name} on GitHub`}>
                    <IconButton
                      aria-label={`View ${github} on GitHub`}
                      href={`https://github.com/${github}`}
                      rel='nofollow me'
                      size='large'
                      target='_blank'
                    >
                      <Icon path={siGithub.path} size={1.2} />
                    </IconButton>
                  </Tooltip>
                )}
                {links.map((link) => {
                  const linkTitle = linkDefinitions[link.type].title(name);
                  const linkIcon = linkDefinitions[link.type].icon;

                  return (
                    <Tooltip
                      arrow
                      key={link.type}
                      title={linkTitle}
                    >
                      <IconButton
                        aria-label={linkTitle}
                        href={link.value}
                        rel='nofollow me'
                        size='large'
                        target='_blank'
                      >
                        <Icon path={linkIcon} size={1.2} />
                      </IconButton>
                    </Tooltip>
                  );
                })}
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