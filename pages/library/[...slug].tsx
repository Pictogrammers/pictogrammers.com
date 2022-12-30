import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import { ParsedUrlQuery } from 'querystring';

import { getAllLibraryPaths, getIcon } from '../../utils/libraryUtils';
import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import IconLibraryView from '../../components/IconLibrary/IconLibraryView';
import IconView from '../../components/IconView/IconView';

interface ContextProps extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { publicRuntimeConfig: { libraries } } = getConfig();
  const { slug } = context.params as ContextProps;
  const [ library, viewType, viewName ] = slug;

  const libraryType = Object.keys(libraries).find((libType) => {
    return libraries[libType].find((lib: IconLibrary) => lib.id === library);
  });

  switch (viewType) {
    case 'icon':
      const iconInfo = await getIcon(library, viewName);
      return {
        props: {
          icon: iconInfo,
          library,
          libraryType,
          slug: slug.join('/')
        }
      };
    default:
      const output = {
        props: {
          library,
          libraryType,
          slug: slug.join('/')
        }
      };

      if (viewType && viewName) {
        output.props[viewType as keyof typeof output.props] = viewName;
      }

      return output;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPaths = await getAllLibraryPaths();
  const paths = allPaths.map((path) => ({ params: { slug: path.split('/') } }));
  return { fallback: false, paths };
};

interface Props {
  author?: string;
  category?: string;
  icon?: IconLibraryIcon;
  library: string;
  libraryType: string;
  slug: string;
  version?: string;
}

const LibraryPage: NextPage<Props> = ({ icon, libraryType, ...props }: Props) => {
  if (libraryType === 'icons') {
    if (icon) {
      return <IconView icon={icon} {...props} />;
    }

    return <IconLibraryView {...props} />;
  }

  if (libraryType === 'fonts') {
    return <div>Font Page not yet available.</div>;
  }

  return null;
};

export default LibraryPage;
