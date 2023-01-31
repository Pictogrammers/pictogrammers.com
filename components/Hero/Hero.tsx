import { FunctionComponent } from 'react';
import cx from 'clsx';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowDownCircle } from '@mdi/js';

import classes from './Hero.module.scss';

const ScrollButton = styled(Button)({
  borderRadius: 50,
  fontSize: 16,
  marginBottom: '12rem',
  padding: '.5rem 1rem',
  textTransform: 'none',
});

interface HeroProps {
  fullHeight?: boolean;
  heading: string;
  showScrollCta?: boolean;
  subHeading: string;
}

const Hero: FunctionComponent<HeroProps> = ({ fullHeight = false, heading, showScrollCta = false, subHeading }) => {
  return (
    <section className={cx(classes.root, {
      [classes.full]: fullHeight
    })}>
      <div className={classes.text}>
        <h1 className={classes.heading}>{heading}</h1>
        <p>{subHeading}</p>
      </div>
      {showScrollCta &&
        <ScrollButton
          href='#users'
          startIcon={<Icon path={mdiArrowDownCircle} size={1} />}
        >
          Scroll to Learn More
        </ScrollButton>
      }
    </section>
  );
};

export default Hero;
