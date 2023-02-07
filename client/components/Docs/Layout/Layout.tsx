import { FunctionComponent, ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Icon from '@mdi/react';
import { mdiTextBoxPlus } from '@mdi/js';
import { siGithub } from 'simple-icons/icons';

import CarbonAd from '@/components/CarbonAd/CarbonAd';
import TableOfContents from '@/components/Docs/TableOfContents/TableOfContents';
import Button from '@/components/Docs/Button';

import { TableOfContentsItemProps } from '@/interfaces/tableOfContents';

import classes from './Layout.module.scss';

interface LayoutProps {
  breadcrumbs?: Array<ReactNode> | ReactNode;
  children: ReactNode;
  color?: string;
  icon?: string;
  improvePage?: {
    gitHubUrl?: string;
    suggestUrl?: string;
  };
  sidebarContent?: Array<ReactNode> | ReactNode;
  title: string;
  toc?: Array<TableOfContentsItemProps>;
}

const Layout: FunctionComponent<LayoutProps> = ({
  breadcrumbs,
  children,
  color = '--grey',
  icon,
  improvePage,
  sidebarContent,
  title,
  toc
}) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <article className={classes.main} role='main'>
          {icon && <Icon className={classes.articleIcon} path={icon} size={4} color={`hsl(var(${color}))`} />}
          {breadcrumbs && (
            <Breadcrumbs
              aria-label='breadcrumb'
              classes={{
                ol: classes.breadcrumb
              }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          )}
          <h1>{title}</h1>
          <div className={classes.content}>
            {children}
          </div>
        </article>
        <aside>
          <div className={classes.sidenav}>
            <CarbonAd />
            {toc && <TableOfContents toc={toc} />}
            {sidebarContent}
            {!!improvePage && (
              <div className={classes.edits}>
                <p className={classes.improvehead}>Improve This Page</p>
                {improvePage?.gitHubUrl && (
                  <Button
                    color='secondary'
                    fullWidth
                    href={improvePage.gitHubUrl}
                    startIcon={<Icon path={siGithub.path} size={.9} />}
                    variant='outlined'
                  >
                    Edit on GitHub
                  </Button>
                )}
                {improvePage?.suggestUrl && (
                  <Button
                    color='secondary'
                    fullWidth
                    href={improvePage.suggestUrl}
                    startIcon={<Icon path={mdiTextBoxPlus} size={1} />}
                    variant='outlined'
                  >
                    Suggest a Change
                  </Button>
                )}
              </div>
            )}
          </div>
        </aside>
      </Paper>
    </div>
  );
};

export default Layout;