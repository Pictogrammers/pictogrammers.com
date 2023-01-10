import { FunctionComponent } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

import Code from '../CodeHighlighter/CodeHighlighter';

import kebabToPascal from '../../utils/helpers/kebabToPascal';

import classes from './IconUsageExamples.module.scss';

interface ExampleVueProps {
  library: string;
  iconName: string;
  visible: boolean;
}

const ExampleVue: FunctionComponent<ExampleVueProps> = ({ iconName, library, visible }) => {
  const jsName = `${library}${kebabToPascal(iconName)}`;

  return (
    <div
      aria-labelledby='example-tab-vue'
      className={classes.example}
      hidden={!visible}
      id='example-tabpanel-vue'
      role='tabpanel'
    >
      <Code className={cx('language-html', classes.code)} displayAsBlock>
{`<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { ${jsName} } from '@${library}/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: ${jsName},
    }
  }
}
</script>`}
      </Code>
      <Button
        color='secondary'
        component={Link}
        fullWidth
        href={`/docs/library/${library}/getting-started/vuejs`}
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

export default ExampleVue;