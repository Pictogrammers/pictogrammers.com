import Link from 'next/link';
import cx from 'clsx';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

import Code from '../CodeHighlighter/CodeHighlighter';

import classes from './IconUsageExamples.module.scss';

interface ExampleHomeAssistantProps {
  library: string;
  iconName: string;
  visible: boolean;
}

const ExampleHomeAssistant = ({ iconName, library, visible }: ExampleHomeAssistantProps) => {
  return (
    <div
      aria-labelledby='example-tab-home-assistant'
      className={classes.example}
      hidden={!visible}
      id='example-tabpanel-home-assistant'
      role='tabpanel'
    >
      <Code className={cx('language-yaml', classes.code)} displayAsBlock>
{`switch.my_switch:
  friendly_name: My Switch
  icon: ${library}:${iconName}`}
      </Code>
      <Button
        color='secondary'
        component={Link}
        fullWidth
        href={`/docs/${library}/guides/home-assistant`}
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

export default ExampleHomeAssistant;