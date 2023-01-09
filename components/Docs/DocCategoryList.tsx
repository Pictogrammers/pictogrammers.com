import { FunctionComponent } from 'react';
import Paper from '@mui/material/Paper';

import { DocCategory, DocData } from '../../interfaces/doc';
import { IconLibrary } from '../../interfaces/icons';

import Head from '../Head/Head';
import LandingPageHeading from '../LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../LandingPageCard/LandingPageCard';

import classes from '../../styles/pages/landing.module.scss';

interface DocCategoryListProps {
  category: DocCategory;
  docs: DocData[];
  library: IconLibrary;
}

const DocCategoryList: FunctionComponent<DocCategoryListProps> = ({ category, docs, library }) => {
  const pageTitle = `${category.name}${library?.name ? ` - ${library.name}` : ''} - Docs`;
  const pageDesc = `${library?.name ? `${library.name} - ` : ''}${category.description}`;
  
  return (
    <div className={classes.root}>
      <Head
        description={pageDesc}
        title={pageTitle}
      />
      <Paper className={classes.container}>
        <LandingPageHeading
          title={category.name}
          superTitle={library?.name}
          description={category.description}
          icon={{ color: `hsl(var(--${category.id}-color))`, path: category.icon }}
        />
        {docs.map((doc, d) => {
          return (
            <LandingPageCard
              description={doc.description}
              href={`/docs/${doc.slug}`}
              // icon={categoryInfo.icon}
              key={d}
              title={doc.title}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default DocCategoryList;