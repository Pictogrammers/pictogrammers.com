import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getAllIconPaths, getIcon } from '../../utils/iconUtils';
import { IconLibraryIcon } from '../../interfaces/icons';

import LibraryView from '../../components/IconLibrary/LibraryView';
import IconView from '../../components/IconLibrary/IconView';

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const [ library, icon ] = slug;

  if (slug.length === 1) {
    return {
      props: {
        library,
        slug: slug.join('/')
      }
    };
  }

  const iconInfo = await getIcon(library, icon);
  return {
    props: {
      icon: iconInfo,
      library,
      slug: slug.join('/')
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPaths = await getAllIconPaths(['slug']);
  // const allPaths = [ 'mdi/account', 'mdi/testing' ];
  const paths = allPaths.map((icon) => ({ params: { slug: icon.split('/') } }));
  return { fallback: false, paths };
};

interface Props {
  icon?: IconLibraryIcon;
  library: string;
  slug: string;
}

const IconLibraryPage: NextPage<Props> = ({ icon, library, slug }: Props) => {
  if (icon) {
    return <IconView icon={icon} library={library} slug={slug} />;
  }

  return <LibraryView library={library} slug={slug} />;
};

export default IconLibraryPage;
