import { TableOfContentsItemProps, TableOfContentsProps } from '../../interfaces/tableOfContents';

import classes from './components.module.scss';

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  if (!toc.length) {
    return null;
  }

  const output = toc.map((item: TableOfContentsItemProps) => (
    <li className={classes[`lvl-${item.lvl}`]} key={item.slug}>
      <a href={`#${item.slug}`}>{item.content}</a>
    </li>
  ));

  return (
    <div className={classes.tableOfContents}>
      <p className={classes.tochead}>Table of Contents</p>
      <div className={classes.toc}>
        <ul>{output}</ul>
      </div>
    </div>
  );
};

export default TableOfContents;
