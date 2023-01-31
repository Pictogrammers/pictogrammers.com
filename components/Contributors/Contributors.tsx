import { Fragment, FunctionComponent } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import Avatar from '@mui/material/Avatar';

import { ContributorProps, ContributorsMdxProps } from '../../interfaces/contributor';

import { useData } from '../../providers/DataProvider';

import LandingPageCard from '../LandingPageCard/LandingPageCard';

import classes from './Contributors.module.scss';

const Contributor: FunctionComponent<ContributorProps> = ({
  contributedRepos,
  core,
  github,
  iconCount,
  id,
  image,
  name
}) => {
  const description = (
    <Fragment>
      {!!contributedRepos.length && <span style={{ display: 'block' }}>Code Contributor</span>}
      {iconCount > 0 && <span>{iconCount} Icon{iconCount === 0 || iconCount > 1 ? 's' : ''}</span>}
    </Fragment>
  );

  const contributorColor = core ? '--primary-color' : '--dark-cyan';

  return (
    <LandingPageCard
      chip={core ? {
        color: 'primary',
        label: 'Core'
      } : undefined}
      color={contributorColor}
      description={description}
      fullWidth
      graphicElement={(
        <Avatar
          sx={{
            backgroundColor: `hsl(var(${contributorColor}))`,
            border: `2px solid hsl(var(${contributorColor}))`,
            height: '50px',
            margin: '.5rem',
            width: '50px'
          }}
        >
          {image ? (
            <ExportedImage
              alt={name}
              height={50}
              placeholder='empty'
              src={`/images/contributors/${id}.jpg`}
              width={50}
            />
          ) : name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
        </Avatar>
      )}
      href={`/contributor/${github}`}
      title={name}
    />
  );
};

const Contributors: FunctionComponent<ContributorsMdxProps> = ({
  filtered = ['contributors'],
  id,
  name,
  view
}) => {
  const { contributors } = useData();
  const filteredList = contributors.filter((contributor: ContributorProps) => {
    if (view === 'single') {
      if (id) {
        return contributor.id === id;
      }

      if (name) {
        return contributor.name === name;
      }
    }

    if (view === 'core') {
      return contributor.core && !filtered.includes(contributor.github);
    }

    if (view === 'community') {
      return !contributor.core && !filtered.includes(contributor.github);
    }

    return contributor;
  });

  return (
    <div className={classes.contributors}>
      {filteredList.map((contributorInfo: ContributorProps) => (
        <Contributor key={contributorInfo.id} {...contributorInfo} />
      ))}
    </div>
  );
};

export default Contributors;