import Link from 'next/link';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

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
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12)'
  },
  backgroundColor: 'white',
  borderBottom: 'none',
  color: theme.palette.primary.main,
  fontSize: 16,
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
          <Image alt={name} fill src={image} />
        </div>
        <h3>{name}</h3>
        {description && <p>{description}</p>}
      </div>
      {link &&
        <Link href={link} passHref>
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
