import { Fragment, FunctionComponent } from 'react';
import Link from 'next/link';
import cx from 'clsx';
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

import Code from '../CodeHighlighter/CodeHighlighter';

import classes from './IconLibraryHistoryView.module.scss';

interface IconHistoryCardProps extends IconChangeRecord {
  library: IconLibrary;
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
  user
}) => {
  const authorId = user.id.split('-')[0];
  const userAvatar = <Avatar alt={user.name.toUpperCase()} classes={{ root: classes.avatar }} src={`/contributors/${authorId}.jpg`} />;

  return (
    <div className={cx(classes.typeCard, classes[type])}>
      {userAvatar}
      <div className={classes.iconContainer}>
      {iconDataBefore && iconDataAfter ? (
        <Fragment>
          <Icon path={iconDataBefore} size={2} />
          <Icon className={classes.arrow} path={mdiArrowRight} size={1} />
          <Icon path={iconDataAfter} size={2} />
        </Fragment>
      ) : (
        <Icon path={icon.data} size={2} />
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
