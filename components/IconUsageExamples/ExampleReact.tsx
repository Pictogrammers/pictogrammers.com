import { FunctionComponent } from 'react';
import cx from 'clsx';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

import Link from '../Link/Link';
import Code from '../CodeHighlighter/CodeHighlighter';

import kebabToPascal from '../../utils/helpers/kebabToPascal';

import classes from './IconUsageExamples.module.scss';

interface ExampleReactProps {
  library: string;
  iconName: string;
  visible: boolean;
}

const ExampleReact: FunctionComponent<ExampleReactProps> = ({ iconName, library, visible }) => {
  const jsName = `${library}${kebabToPascal(iconName)}`;

  return (
    <div
      aria-labelledby='example-tab-react'
      className={classes.example}
      hidden={!visible}
      id='example-tabpanel-react'
      role='tabpanel'
    >
      <Code className={cx('language-jsx', classes.code)} displayAsBlock>{
`import Icon from '@mdi/react';
import { ${jsName} } from '@${library}/js';

<Icon path={${jsName}} size={1} />`
      }</Code>
      <Button
        color='secondary'
        component={Link}
        fullWidth
        href={`/docs/library/${library}/getting-started/react`}
        size='large'
        startIcon={<Icon path={mdiArrowRight} size={1} />}
        sx={{ textDecoration: 'none' }}
        variant='contained'
      >
        Start Using this Icon
      </Button>
    </div>
  );
};

export default ExampleReact;