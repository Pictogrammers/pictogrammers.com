import { FunctionComponent, ReactNode, useId, useState } from 'react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

import classes from './components.module.scss';

interface TabsProps {
  children?: TabProps[];
}

interface TabProps {
  props: {
    title: string;
    children?: ReactNode;
  }
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  tabId: string;
  value: number;
}

const Tab: FunctionComponent<TabPanelProps> = ({ children, index, tabId, value, ...rest }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${tabId}-${index}`}
      aria-labelledby={`tab-${tabId}-${index}`}
      {...rest}
    >
      {value === index && (
        <div className='tab-panel'>
          {children}
        </div>
      )}
    </div>
  );
};

const Tabs: FunctionComponent<TabsProps> = ({ children }) => {
  const tabId = useId();
  const [ value, setValue ] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!children?.length) {
    return null;
  }

  return (
    <div className={classes.tabContainer}>
      <MuiTabs
        allowScrollButtonsMobile
        onChange={handleChange}
        scrollButtons
        value={value}
        variant='scrollable'
      >
        {
          children.map((child, i) => (
            <MuiTab
              aria-controls={`tabpanel-${tabId}-${i}`}
              id={`tab-${tabId}-${i}`}
              key={`tab-${tabId}-${i}`}
              label={child.props.title}
            />
          ))
        }
      </MuiTabs>
      {
        children.map((child, i) => (
          <Tab
            index={i}
            tabId={tabId}
            key={`tabpanel-${tabId}-${i}`}
            value={value}
          >
            {child.props.children}
          </Tab>
        ))
      }
    </div>
  );
};

export { Tab, Tabs };