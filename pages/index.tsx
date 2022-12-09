import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';
import Icon from '@mdi/react';
import { mdiCrowd } from '@mdi/js';

import { getContributors } from '../utils/apiUtils';
import { IContributor } from '../types/contributor';

import Hero from '../components/Hero/Hero';
import HomeSection from '../components/HomeSection/HomeSection';
import LibraryCard from '../components/LibraryCard/LibraryCard';

import AmbrookLogo from '../assets/ambrook.svg';
import AccusoftLogo from '../assets/accusoft.svg';
import HomeAssistantLogo from '../assets/home-assistant.svg';
import KeePassXCLogo from '../assets/keepassxc.svg';
import NabuCasaLogo from '../assets/nabu-casa.svg';
import OnTaskLogo from '../assets/ontask.svg';

import MDILogo from '../assets/mdi.svg';
import MDLLogo from '../assets/mdl.svg';

import classes from '../styles/pages/index.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  const contributors = await getContributors(12);
  return { props: { contributors } };
};

type Props = {
  contributors: IContributor[]
}

const Home: NextPage<Props> = ({ contributors }: Props) => {
  const featuredIconLibraries = [
    {
      description: 'The original. Following Google\'s Material Design guidelines for system icons, MDI is our largest library, touting over 6500 unique icons!',
      id: 'mdi',
      image: <MDILogo />,
      link: 'https://materialdesignicons.com/',
      name: 'Material Design Icons',
    },
    {
      description: 'Taking a lighter spin on Google\'s Material Design guidelines, MDL slims down icons to be modern, crisp, and clean.',
      id: 'mdl',
      image: <MDLLogo />,
      link: 'https://github.com/Templarian/MaterialDesignLight',
      name: 'Material Design Light'
    }
  ];

  return (
    <Fragment>
      <Hero
        fullHeight
        heading='Open-source iconography for designers and developers'
        showScrollCta
        subHeading="We're a collective of passionate individuals creating beautiful icon libraries for drop-in use in your designs and development."
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
            {contributors?.length && (
              <ul className={classes.contributors}>
                {contributors.map((contributor) => (
                  <li key={contributor.id} title={contributor.name}>
                    <Image
                      src={`data:image/jpeg;base64,${contributor.base64}`}
                      alt={contributor.name}
                      height={65}
                      width={65}
                    />
                  </li>
                ))}
              </ul>
            )}
            <p>
              The Pictogrammers Icon Group is a diverse group of 100+ collaborators
              from all walks of life. Hailing from all corners of the globe, we come
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
        <HomeSection title='Featured Icon Libraries' highlight>
          <div className={classes.libraries}>
            {featuredIconLibraries.map((library) => (
              <LibraryCard
                key={library.id}
                name={library.name}
                description={library.description}
                image={library.image}
                link={library.link}
              />
            ))}
          </div>
        </HomeSection>
        <HomeSection id='join' title='Join Us'>
          <div className={classes.join}>
            <p>
              If you&apos;re looking to get involved with the Pictogrammers Icon Group, there are many ways you can help! You can tackle <a href='https://github.com/Templarian/MaterialDesign/issues'>issues and icon requests</a> on one of our libraries. You can <a href='https://github.com/Pictogrammers/Icon-Site/tree/master/src/content'>write and update documentation</a> to help those looking to get started. Interested in writing an integration we don&apos;t have... <a href='https://dev.materialdesignicons.com/contribute/third-party-guide'>Go for it!</a>
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

// import { IDoc } from '../types/doc';

// import { getAllDocs } from '../utils/mdxUtils';

// props type
// type Props = {
//   posts: [IDoc]
// }

// get posts from serverside at build time
// export const getStaticProps: GetStaticProps = async () => {
//   const posts = getAllDocs([
//     'title',
//     'slug',
//     'date',
//     'description',
//     'thumbnail'
//   ]);

//   // retunr the posts props
//   return { props: { posts } };
// };