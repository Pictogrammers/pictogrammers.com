import { NextPage } from 'next';
import getConfig from 'next/config';
import Link from 'next/link';
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Icon from '@mdi/react';
import { mdiCrowd } from '@mdi/js';

import Hero from '../components/Hero/Hero';
import HomeSection from '../components/HomeSection/HomeSection';
import LibraryCard from '../components/LibraryCard/LibraryCard';

import getRandomArrayValues from '../utils/helpers/getRandomArrayValues';

import { IconLibrary } from '../interfaces/icons';

import AmbrookLogo from '../assets/users/ambrook.svg';
import AccusoftLogo from '../assets/users/accusoft.svg';
import HomeAssistantLogo from '../assets/users/home-assistant.svg';
import KeePassXCLogo from '../assets/users/keepassxc.svg';
import NabuCasaLogo from '../assets/users/nabu-casa.svg';
import OnTaskLogo from '../assets/users/ontask.svg';

import contributorsJson from '../public/contributors/contributors.json';

import classes from '../styles/pages/index.module.scss';

const Home: NextPage = () => {
  const { contributors, totalContributors } = contributorsJson;
  const coreContributors = contributors.filter((contributor) => contributor.core);
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
            {coreContributors?.length && (
              <AvatarGroup classes={{ root: classes.contributors }} max={12}>
                {getRandomArrayValues(coreContributors, 11).map((contributor) => (
                  <Avatar
                    alt={contributor.name}
                    classes={{ root: classes.contributor }}
                    key={contributor.id}
                    src={contributor.image ? `/contributors/${contributor.id}.jpg` : undefined}
                  />
                ))}
                <Avatar classes={{ root: classes.contributor }}>+{totalContributors - 11}</Avatar>
              </AvatarGroup>
            )}
            <p>
              The Pictogrammers are a diverse group of {totalContributors}+ collaborators
              from all walks of life. Hailing from nearly ever corner of the globe, we come
              together to express ideas in a universal language so that all may
              benefit. Icons may be small, but they are powerful forms of
              communication in today&apos;s digital age. Built on our passion for beautiful
              and simple design, we strive to make iconography easily accessible for
              whatever your use case may be. From designers building prototypes to
              developers writing code, finding and implementing an icon should be a
              snap!
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
                link={`/icons/${library.id}`}
              />
            ))}
          </div>
        </HomeSection>
        <HomeSection id='join' title='Join Us'>
          <div className={classes.join}>
            <p>
              If you&apos;re looking to get involved with the Pictogrammers, there are many ways you can help! You can tackle <Link href='/docs/contribute'>issues and icon requests</Link> on one of our libraries. You can <a href='https://github.com/Pictogrammers/pictogrammers.com/tree/main/src/docs'>write and update documentation</a> to help those looking to get started. Interested in writing an integration we don&apos;t have... <Link href='/docs/contribute/third-party'>Go for it!</Link>
              <br />
              <br />
              If you have any questions about how you can make an impact, reach out to us on <a href='https://fosstodon.org/@pictogrammers' rel='me'>Mastodon</a> or open a <a href='https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Question&template=6_question.yml'>GitHub issue</a>. We look forward to meeting you!
            </p>
            <Icon
              className={classes.crowd}
              color='#696969'
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
