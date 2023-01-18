import { FunctionComponent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mdi/react';
import {
  mdiApps,
  mdiChevronDown,
  mdiFormatListBulleted,
  mdiViewGrid
} from '@mdi/js';

interface LibraryViewModeMenuProps {
  compact: boolean;
  currentView: string;
  setViewMode: Function;
};

export const viewModes = {
  comfortable: {
    icon: mdiViewGrid,
    iconSize: 2,
    name: 'Comfortable'
  },
  compact: {
    icon: mdiApps,
    iconSize: 1.2,
    name: 'Compact'
  },
  list: {
    icon: mdiFormatListBulleted,
    iconSize: .8,
    name: 'List'
  }
};

const LibraryViewMode: FunctionComponent<LibraryViewModeMenuProps> = ({ compact, currentView, setViewMode }) => {
  const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const buildMenuOptions = () => {
    return Object.keys(viewModes).map((mode) => (
      <MenuItem
        key={mode}
        onClick={() => {
          setViewMode(mode);
          setMenuAnchor(null);
        }}
        selected={currentView === mode}
      >
        <ListItemIcon>
          <Icon
            path={viewModes[mode as keyof typeof viewModes].icon}
            size={1}
          />
        </ListItemIcon>
        <ListItemText>{viewModes[mode as keyof typeof viewModes].name}</ListItemText>
      </MenuItem>
    ));
  };

  if (compact) {
    return (
      <div>
        <Button
          aria-controls={!!menuAnchor ? 'view-mode-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={!!menuAnchor ? 'true' : undefined}
          aria-label='View Mode'
          disableRipple
          endIcon={<Icon path={mdiChevronDown} size={1} />}
          id='view-mode-menu-button'
          onClick={handleMenuClick}
          variant='contained'
        >
          <Icon path={viewModes[currentView as keyof typeof viewModes].icon} size={1} />
        </Button>
        <Menu
          anchorEl={menuAnchor}
          id='view-mode-menu'
          MenuListProps={{
            'aria-labelledby': 'view-mode-menu-button'
          }}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          {buildMenuOptions()}
        </Menu>
      </div>
    );
  }

  return (
    <ButtonGroup variant='outlined' aria-label='View Mode'>
      {Object.keys(viewModes).map((mode) => (
        <Tooltip arrow key={mode} title={viewModes[mode as keyof typeof viewModes].name}>
          <Button
            aria-label={viewModes[mode as keyof typeof viewModes].name}
            onClick={() => setViewMode(mode)}
            variant={currentView === mode ? 'contained' : 'outlined'}
          >
            <Icon path={viewModes[mode as keyof typeof viewModes].icon} size={1} />
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};

export default LibraryViewMode;
