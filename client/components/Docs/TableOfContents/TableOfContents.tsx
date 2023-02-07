import { FunctionComponent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { TableOfContentsItemProps, TableOfContentsProps } from '@/interfaces/tableOfContents';

import Link from '@/components/Link/Link';

import classes from './TableOfContents.module.scss';

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({ toc }) => {
  if (!toc.length) {
    return null;
  }

  const output = toc.map((item: TableOfContentsItemProps) => (
    <ListItem key={item.slug}>
      <ListItemButton component={Link} href={`#${item.slug}`}>
        <ListItemText classes={{ root: classes[`lvl-${item.lvl}`] }}>{item.content}</ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div className={classes.tableOfContents}>
      <p className={classes.tochead}>Table of Contents</p>
      <div className={classes.toc}>
        <List dense>
          {output}
        </List>
      </div>
    </div>
  );
};

export default TableOfContents;
