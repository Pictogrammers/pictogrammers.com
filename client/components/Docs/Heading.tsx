import { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { stripHtml } from 'string-strip-html';
import slugify from 'slugify';
import { Icon as MDIIcon } from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';

import Link from '@/components/Link/Link';

import classes from './components.module.scss';

interface HeadingProps {
  children?: ReactNode | any;
}

const Heading = (level: number) => function Heading(props: HeadingProps) {
  const { children } = props;
  const { result: childText } = stripHtml(renderToString(children));
  const HeadingElement = `h${level}` as keyof JSX.IntrinsicElements;
  const headingId = slugify(childText, { lower: true });
  return (
    <div className={classes.heading}>
      <HeadingElement id={headingId}>{children}</HeadingElement>
      <Link
        className={classes.headingAchor}
        href={`#${headingId}`}
        title={`Link to ${children}`}
      >
        <MDIIcon path={mdiLinkVariant} size={.9} />
      </Link>
    </div>
  );
};

export default Heading;