import { FunctionComponent } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

import Link from '../Link/Link';

import classes from './LibraryCard.module.scss';

export interface LibraryCardProps {
  description: string;
  image: string;
  link: string;
  name: string;
}

const LibraryButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main
  },
  backgroundColor: 'white',
  borderBottom: 'none',
  color: theme.palette.primary.main,
  fontSize: 16,
  paddingBottom: 8,
  paddingTop: 8,
  textTransform: 'none'
}));

const LibraryCard: FunctionComponent<LibraryCardProps> = ({
  description,
  image,
  link,
  name
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.image}>
          <ExportedImage alt={name} fill placeholder='empty' src={image} />
        </div>
        <h3>{name}</h3>
        {description && <p>{description}</p>}
      </div>
      {link &&
        <Link href={link}>
          <LibraryButton
            endIcon={<Icon path={mdiArrowRight} size={1} />}
            fullWidth
            variant='contained'
          >
            Browse Library
          </LibraryButton>
        </Link>
      }
    </div>
  );
};

export default LibraryCard;
