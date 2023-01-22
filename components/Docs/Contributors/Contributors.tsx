import { FunctionComponent } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import contributorsJson from '../../../public/contributors/contributors.json';
import { ContributorProps, ContributorsMdxProps } from '../../../interfaces/contributor';

import classes from './Contributors.module.scss';

const Contributor: FunctionComponent<ContributorProps> = ({
  core,
  github,
  iconCount,
  id,
  image,
  name
}) => {
  return (
    <Link className={classes.root} href={`/contributor/${github}`}>
      <Card
        classes={{ 
          root: cx({
            [classes.core]: core
          })
        }}
        sx={{
          display: 'flex',
          height: '125px',
          width: '100%'
        }}
      >
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          badgeContent={core && 'Core'}
          classes={{ badge: classes.badge, root: classes.box }}
          invisible={!core}
        >
          <div className={classes.content}>
            <Avatar
              alt={name}
              src={image ? `/contributors/${id}.jpg` : undefined}
              sx={{
                backgroundColor: 'hsl(var(--primary-color))',
                border: '2px solid hsl(var(--primary-color))',
                height: '50px',
                marginRight: '1rem',
                width: '50px'
              }}
            >
              {name.split(' ').map((n)=>n[0]).join('').toUpperCase()}
            </Avatar>
            <div className={classes.info}>
              <h2 title={name}>{name}</h2>
              <p>{new Intl.NumberFormat('en-US').format(iconCount)} Icon{iconCount === 0 || iconCount > 1 ? 's' : ''}</p>
            </div>
          </div>
        </Badge>
      </Card>
    </Link>
  );
};

const Contributors: FunctionComponent<ContributorsMdxProps> = ({ id, name, view }) => {
  const { contributors } = contributorsJson;
  const filteredList = contributors.filter((contributor) => {
    if (view === 'single') {
      if (id) {
        return contributor.id === id;
      }

      if (name) {
        return contributor.name === name;
      }
    }

    if (view === 'core') {
      return contributor.core;
    }

    if (view === 'community') {
      return !contributor.core;
    }

    return contributor;
  });

  return (
    <div className={classes.contributors}>
      {filteredList.map((contributorInfo) => (
        <Contributor key={contributorInfo.id} {...contributorInfo} />
      ))}
    </div>
  );
};

export default Contributors;