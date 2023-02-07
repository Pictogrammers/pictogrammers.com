import { FunctionComponent, MouseEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiViewComfy,
  mdiViewModule
} from '@mdi/js';

interface LibraryViewModeMenuProps {
  color?: 'primary' | 'secondary';
  compact: boolean;
  currentView: string;
  setViewMode: Function;
};

const mdiViewGridCompact = 'M2,5h2v2H2V5 M5,5h2v2H5V5 M8,5h2v2H8V5 M11,5h2v2h-2V5 M14,5h2v2h-2V5 M17,5h2v2h-2V5 M20,5h2v2h-2V5 M2,8h2v2H2V8 M5,8h2v2H5V8 M8,8h2v2H8V8 M11,8h2v2h-2V8 M14,8h2v2h-2V8 M17,8h2v2h-2V8 M20,8h2v2h-2V8 M2,11h2v2H2V11 M5,11h2v2H5V11 M8,11h2v2H8V11M11,11h2v2h-2V11 M14,11h2v2h-2V11 M17,11h2v2h-2V11 M20,11h2v2h-2V11 M2,14h2v2H2V14 M5,14h2v2H5V14 M8,14h2v2H8V14 M11,14h2v2h-2V14 M14,14h2v2h-2V14 M17,14h2v2h-2V14 M20,14h2v2h-2V14 M2,17h2v2H2V17 M5,17h2v2H5V17 M8,17h2v2H8V17 M11,17h2v2h-2V17 M14,17h2v2h-2V17 M17,17h2v2h-2V17 M20,17h2v2h-2V17';
export const viewModes = {
  default: {
    icon: mdiViewModule,
    iconSize: 2,
    name: 'Default'
  },
  // eslint-disable-next-line sort-keys
  comfortable: {
    icon: mdiViewComfy,
    iconSize: 1.2,
    name: 'Comfortable'
  },
  compact: {
    icon: mdiViewGridCompact,
    iconSize: 1,
    name: 'Compact'
  }
};

const LibraryViewMode: FunctionComponent<LibraryViewModeMenuProps> = ({ color = 'primary', compact, currentView, setViewMode }) => {
  const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
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
          color={color}
          disableRipple
          endIcon={<Icon path={mdiChevronDown} size={1} />}
          id='view-mode-menu-button'
          onClick={handleMenuClick}
          variant='contained'
        >
          <Icon
            path={viewModes[currentView as keyof typeof viewModes].icon}
            size={1}
          />
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
    <ButtonGroup color={color} variant='outlined' aria-label='View Mode'>
      {Object.keys(viewModes).map((mode) => (
        <Tooltip arrow key={mode} title={viewModes[mode as keyof typeof viewModes].name}>
          <Button
            aria-label={viewModes[mode as keyof typeof viewModes].name}
            onClick={() => setViewMode(mode)}
            variant={currentView === mode ? 'contained' : 'outlined'}
          >
            <Icon
              path={viewModes[mode as keyof typeof viewModes].icon}
              size={1}
            />
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};

export default LibraryViewMode;
