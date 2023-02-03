import { Fragment } from 'react';
import { NextPage } from 'next';
import getConfig from 'next/config';
import ExportedImage from 'next-image-export-optimizer';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Icon from '@mdi/react';
import { mdiCrowd } from '@mdi/js';

import Link from '../components/Link/Link';
import Hero from '../components/Hero/Hero';
import HomeSection from '../components/HomeSection/HomeSection';
import LibraryCard from '../components/LibraryCard/LibraryCard';

import getRandomArrayValues from '../utils/helpers/getRandomArrayValues';

import { IconLibrary } from '../interfaces/icons';
import { ContributorProps } from '../interfaces/contributor';

import { useData } from '../providers/DataProvider';

import AmbrookLogo from '../public/images/users/ambrook.svg';
import AccusoftLogo from '../public/images/users/accusoft.svg';
import HomeAssistantLogo from '../public/images/users/home-assistant.svg';
import KeePassXCLogo from '../public/images/users/keepassxc.svg';
import NabuCasaLogo from '../public/images/users/nabu-casa.svg';
import OnTaskLogo from '../public/images/users/ontask.svg';

import classes from '../styles/pages/index.module.scss';

const Home: NextPage = () => {
  const { contributors } = useData();
  const totalContributors = contributors.length;
  const coreContributors = contributors.filter((contributor: ContributorProps) => contributor.core);
  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const featuredIconLibraries = iconLibraries.filter((lib: IconLibrary) => lib.featured === true);

  return (
    <Fragment>
      <Hero
        fullHeight
        heading='Open-source iconography for designers and developers'
        showScrollCta
        subHeading="We're a collective of passionate individuals creating beautiful icon and font libraries for drop-in use in your designs and development."
      />
      <main className={classes.main}>
        <HomeSection id='users' initialWave>
          <div className={classes.users}>
            <div className={classes.logos}>
              <AmbrookLogo />
              <AccusoftLogo />
              <HomeAssistantLogo />
              <KeePassXCLogo />
              <NabuCasaLogo />
              <OnTaskLogo />
            </div>
            <p>
              From open-source software to industry leaders,<br />
              the best teams use Pictogrammers&apos; libraries to build their apps.
            </p>
          </div>
        </HomeSection>
        <HomeSection className={classes.about} id='about' title='Who are we?'>
          <div>
            {!!coreContributors?.length && (
              <AvatarGroup classes={{ root: classes.contributors }} max={12}>
                {getRandomArrayValues(coreContributors, 9).map((contributor) => (
                  <Avatar classes={{ root: classes.contributor }} key={contributor.id}>
                    {contributor.image ? (
                      <ExportedImage
                        alt={contributor.name}
                        height={65}
                        placeholder='empty'
                        src={`/images/contributors/${contributor.id}.jpg`}
                        width={65}
                      />
                    ) : contributor.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </Avatar>
                ))}
                <Avatar classes={{ root: classes.contributor }}>+{totalContributors - 9}</Avatar>
              </AvatarGroup>
            )}
            <p>
              The Pictogrammers are a dedicated group of <Link href='/docs/contribute/contributors/'>{totalContributors > 0 ? `${Math.floor(totalContributors / 10) * 10}+` : ''} collaborators</Link> from all walks of life. Hailing from nearly every part of the globe, we come together to express ideas in a universal language so that all may benefit. Icons may be small, but they are powerful forms of communication in today&apos;s digital age. Built on our passion for beautiful and simple design, we strive to make iconography easily accessible for whatever your use case may be. From designers building prototypes to developers writing code, finding and implementing an icon should be a snap!
            </p>
          </div>
        </HomeSection>
        <HomeSection title='Featured Libraries' highlight>
          <div className={classes.libraries}>
            {featuredIconLibraries.map((library: IconLibrary) => (
              <LibraryCard
                key={library.id}
                name={library.name}
                description={library.description}
                image={library.image}
                link={`/library/${library.id}`}
              />
            ))}
          </div>
        </HomeSection>
        <HomeSection id='join' title='Join Us'>
          <div className={classes.join}>
            <p>
              If you&apos;re looking to get involved with the Pictogrammers, there are many ways you can help! You can tackle <Link href='/docs/contribute'>issues and icon requests</Link> on one of our libraries. You can <Link href='https://github.com/Pictogrammers/pictogrammers.com/tree/main/docs'>write and update documentation</Link> to help those looking to get started. Interested in writing an integration we don&apos;t have... <Link href='/docs/contribute/third-party'>Go for it!</Link>
              <br />
              <br />
              If you have any questions about how you can make an impact, reach out to us on <Link href='https://fosstodon.org/@pictogrammers' rel='me'>Mastodon</Link> or open a <Link href='https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Question&template=6_question.yml'>GitHub issue</Link>. We look forward to meeting you!
            </p>
            <Icon
              className={classes.crowd}
              color='currentColor'
              path={mdiCrowd}
              size={48}
            />
          </div>
        </HomeSection>
      </main>
    </Fragment>
  );
};

export default Home;
