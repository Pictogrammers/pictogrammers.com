import { ReactNode } from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import { Icon as MDIIcon } from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';

import classes from './components.module.scss';

interface HeadingProps {
  children?: ReactNode | any;
}

const Heading = (level: number) => function Heading({ children }: HeadingProps) {
  const HeadingElement = `h${level}` as keyof JSX.IntrinsicElements;
  const headingId = slugify(children, { lower: true });
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