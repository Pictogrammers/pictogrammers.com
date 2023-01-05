import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';

import classes from './HomeSection.module.scss';

interface HomeSectionProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  id?: string;
  initialWave?: boolean;
  title?: string;
}

const HomeSection: FunctionComponent<HomeSectionProps> = ({ children, className, highlight, id, initialWave = false, title }) => {
  return (
    <section
      className={cx(classes.root, className, {
        [classes.highlight]: highlight,
        [classes.wave]: initialWave
      })}
      id={id}
    >
      {title && <h2>{title}</h2>}
      <div className={classes.container}>
        {children}
      </div>
    </section>
  );
};

export default HomeSection;
