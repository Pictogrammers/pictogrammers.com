import { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

import { LibraryCardProps } from './LibraryCardProps';

import classes from './LibraryCard.module.scss';

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
        {image}
        <h3>{name}</h3>
        {description && <p>{description}</p>}
      </div>
      {link &&
        <LibraryButton
          endIcon={<Icon path={mdiArrowRight} size={1} />}
          href={link}
          variant='contained'
        >
          Browse Library
        </LibraryButton>
      }
    </div>
  );
};

export default LibraryCard;
