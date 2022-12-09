import { FunctionComponent } from 'react';
import cx from 'clsx';

import { HomeSectionProps } from './HomeSectionProps';

import classes from './HomeSection.module.scss';

const HomeSection: FunctionComponent<HomeSectionProps> = ({
  children,
  className,
  highlight,
  id,
  initialWave = false,
  title
}: HomeSectionProps) => {
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
