import { ReactNode, useId, useState } from 'react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

import classes from '../DocPage.module.scss';

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
  value: number;
}

const Tabs = (attr: TabsProps) => {
  const tabId = useId();
  const [ value, setValue ] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!attr?.children?.length) {
    return;
  }

  const TabPanel = (props: TabPanelProps) => {
    const { children, index, value, ...rest } = props;
  
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

  return (
    <div className={classes.tabContainer}>
      <MuiTabs onChange={handleChange} value={value}>
        {
          attr.children.map((child, i) => (
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
        attr.children.map((child, i) => (
          <TabPanel
            index={i}
            key={`tabpanel-${tabId}-${i}`}
            value={value}
          >
            {child.props.children}
          </TabPanel>
        ))
      }
    </div>
  );
};

export default Tabs;