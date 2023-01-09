import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import gfm from 'remark-gfm';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

import { Doc, DocCategory, DocData } from '../../interfaces/doc';
import { IconLibraries, IconLibrary } from '../../interfaces/icons';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { getDoc, getDocPaths } from '../../utils/docUtils';

import DocView from '../../components/Docs/DocView';
import DocCategoryList from '../../components/Docs/DocCategoryList';

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const doc = await getDoc(slug) as Doc;
  const {
    availableIcons,
    category,
    content,
    data,
    disabled,
    landingPage,
    library,
    readingTime,
    toc
  } = doc;

  if (disabled) {
    return { notFound: true };
  }

  if (landingPage) {
    return {
      props: {
        ...doc
      }
    };
  }

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [ gfm ]
    },
    scope: data
  });

  return {
    props: {
      availableIcons,
      category,
      frontMatter: data,
      library,
      readingTime,
      slug: slug.join('/'),
      source: mdxSource,
      toc
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getDocPaths();
  const pathSlugs = paths.map((docPath) => ({
    params: {
      slug: docPath.replace('.mdx', '').split('/')
    }
  }));
  return { fallback: false, paths: pathSlugs };
};

interface DocsPageProps {
  availableIcons: IconLibraries;
  category: DocCategory;
  frontMatter: DocData;
  landingPage?: boolean;
  library: IconLibrary;
  readingTime?: string;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

const DocsPage: NextPage<DocsPageProps> = ({ landingPage, ...rest }) => {
  if (landingPage) {
    return <DocCategoryList {...rest as any} />;
  }

  return <DocView {...rest} />;
};

export default DocsPage;
