import { FunctionComponent, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ExampleReact from './ExampleReact';
import ExampleVue from './ExampleVue';
import ExampleWebfont from './ExampleWebfont';
import ExampleHomeAssistant from './ExampleHomeAssistant';

import classes from './IconUsageExamples.module.scss';
import { IconLibrary } from '@/interfaces/icons';

const exampleTypesDef = {
  'home-assistant': {
    component: ExampleHomeAssistant,
    name: 'Home Assistant'
  },
  react: {
    component: ExampleReact,
    name: 'React'
  },
  vue: {
    component: ExampleVue,
    name: 'Vue'
  },
  webfont: {
    component: ExampleWebfont,
    name: 'Webfont'
  }
};

interface IconUsageExamplesProps {
  exampleTypes: string[];
  library: string;
  libraryInfo: IconLibrary;
  iconName: string;
}

const IconUsageExamples: FunctionComponent<IconUsageExamplesProps> = ({ exampleTypes = [], iconName, library, libraryInfo }) => {
  const [ activeExample, setActiveExample ] = useState(0);

  if (!exampleTypes.length) {
    return null;
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => setActiveExample(newValue);
  const availableTypes = exampleTypes.filter((type) => type in exampleTypesDef);

  return (
    <div className={classes.root}>
      <Tabs
        aria-label='Icon Usage Examples'
        onChange={handleChange}
        scrollButtons='auto'
        value={activeExample}
        variant='scrollable'
      >
        {availableTypes.map((type) => (
          <Tab
            aria-controls={`example-tab-${type}`}
            id={`example-tab-${type}`}
            key={`tab-${type}`}
            label={exampleTypesDef[type as keyof typeof exampleTypesDef].name}
          />
        ))}
      </Tabs>
      {availableTypes.map((type, i) => {
        const ExampleComponent = exampleTypesDef[type as keyof typeof exampleTypesDef].component;
        return (
          <ExampleComponent
            key={`panel-${type}`}
            library={library}
            libraryInfo={libraryInfo}
            iconName={iconName}
            visible={activeExample === i}
          />
        );
      })}
    </div>
  );
};

export default IconUsageExamples;