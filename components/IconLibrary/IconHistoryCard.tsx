import { Fragment, FunctionComponent } from 'react';
import cx from 'clsx';
import ExportedImage from 'next-image-export-optimizer';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

import { IconChangeRecord } from '../../interfaces/history';
import { IconLibrary } from '../../interfaces/icons';
import { ContributorProps } from '../../interfaces/contributor';

import Link from '../Link/Link';
import Code from '../CodeHighlighter/CodeHighlighter';
import CustomGridIcon from '../CustomGridIcon/CustomGridIcon';

import classes from './IconLibraryHistoryView.module.scss';

interface IconHistoryCardProps extends IconChangeRecord {
  library: IconLibrary;
  userInfo: ContributorProps;
}

const actionText = (type: string, iconName: string, prevIconName?: string, text?: string) => {
  switch (type) {
    case 'iconCreated':
      return <Fragment>Icon <Code>{iconName}</Code> created.</Fragment>;
    case 'iconModified':
      return <Fragment>Icon <Code>{iconName}</Code> modified.</Fragment>;
    case 'iconRenamed':
      return <Fragment>Icon <Code>{prevIconName}</Code> renamed to <Code>{iconName}</Code>.</Fragment>;
    case 'iconDeleted':
      return <Fragment>Icon <Code>{iconName}</Code> deleted.</Fragment>;
    case 'iconAlias':
      return <Fragment>Icon <Code>{iconName}</Code> aliased with <Code>{text}</Code>.</Fragment>;
    case 'iconTag':
      return <Fragment>Icon <Code>{iconName}</Code> added to <Code>{text}</Code> category.</Fragment>;
    default:
      return <Fragment>No text for {type} - {iconName}</Fragment>;
  }
};

const IconHistoryCard: FunctionComponent<IconHistoryCardProps> = ({
  date,
  icon,
  iconDataAfter,
  iconDataBefore,
  iconNameBefore,
  issue,
  library,
  text,
  type,
  user,
  userInfo
}) => {
  const userAvatar = (
    <Link href={`/contributor/${user.github}`}>
      <Avatar
        classes={{ root: classes.avatar }}
        sx={{
          background: `hsl(var(${userInfo?.core ? '--primary-color' : '--dark-cyan'}))`,
          border: `2px solid hsl(var(${userInfo?.core ? '--primary-color' : '--dark-cyan'}))`
        }}
      >
        {userInfo?.image ? (
          <ExportedImage
            alt={user.name}
            height={50}
            placeholder='empty'
            src={`/images/contributors/${userInfo.id}.jpg`}
            width={50}
          />
        ) : user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
      </Avatar>
    </Link>
  );

  return (
    <div className={cx(classes.typeCard, classes[type])}>
      {userAvatar}
      <div className={classes.iconContainer}>
        {iconDataBefore && iconDataAfter ? (
          <Fragment>
            <CustomGridIcon gridSize={library.gridSize} path={iconDataBefore} size={2} />
            <Icon className={classes.arrow} path={mdiArrowRight} size={1} />
            <CustomGridIcon gridSize={library.gridSize} path={iconDataAfter} size={2} />
          </Fragment>
        ) : (
          <CustomGridIcon gridSize={library.gridSize} path={icon.data} size={2} />
        )}
      </div>
      <div className={classes.modDesc}>
        <div>{actionText(type, icon.name, iconNameBefore, text)}</div>
        <div className={classes.subDesc}>{userAvatar}By {user.name} at {dayjs(date, dayjs.tz.guess()).format('h:mma')}</div>
      </div>
      {!!issue?.toString() && (
        <Tooltip arrow placement='top' title='View GitHub Issue'>
          <Link className={classes.githubLink} href={`${library.git}/issues/${issue}`}>
            <Chip label={`#${issue.toString()}`} color='secondary' sx={{ cursor: 'pointer' }} />
          </Link>
        </Tooltip>
      )}
    </div>
  );
};

export default IconHistoryCard;
