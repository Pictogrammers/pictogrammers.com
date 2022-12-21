import { FunctionComponent, useState } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

import classes from './LibraryMenu.module.scss';

interface LibraryMenuProps {
  selectedLibrary: {
    name: string;
    id: string;
    image: string;
  }
};

const LibraryMenu: FunctionComponent<LibraryMenuProps> = ({ selectedLibrary }) => {
  const { publicRuntimeConfig: { libraries } } = getConfig();
  const [ libraryMenuAnchor, setLibraryMenuAnchor ] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLibraryMenuAnchor(event.currentTarget);
  };

  const buildMenuOptions = () => {
    const types = Object.keys(libraries).sort().reverse();
    const availableTypes = types.reduce((output, type) => {
      if (libraries[type].length) {
        output.push(type);
      }
      return output;
    }, [] as string[]);

    const typeMap = {
      fonts: 'Fonts',
      icons: 'Icon Libraries'
    };

    return availableTypes.map((type) => {
      const availableLibraries = libraries[type].map((lib: any) => {
        return (
          <MenuItem
            classes={{ root: classes.menuItem }}
            component={Link}
            href={`/icons/${lib.id}`}
            key={lib.id}
            onClick={() => setLibraryMenuAnchor(null)}
            selected={selectedLibrary.id === lib.id}
          >
            <ListItemIcon>
              <Image alt={lib.name} height={24} src={`/${lib.image}`} width={24} />
            </ListItemIcon>
            <ListItemText>{lib.name}</ListItemText>
          </MenuItem>
        );
      });

      return [
        <ListSubheader key={type}>
          <ListItemText
            disableTypography
            sx={{
              fontSize: '.9rem',
              lineHeight: 2,
              textTransform: 'uppercase',
              userSelect: 'none'
            }}
          >
            {typeMap[type as keyof typeof typeMap]}
          </ListItemText>
        </ListSubheader>,
        ...availableLibraries
      ];
    });
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls={!!libraryMenuAnchor ? 'library-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={!!libraryMenuAnchor ? 'true' : undefined}
        classes={{ root: classes.libraryMenu }}
        disableRipple
        endIcon={<Icon path={mdiChevronDown} size={1} />}
        id='library-menu-button'
        onClick={handleMenuClick}
        variant='text'
      >
        <Image alt={selectedLibrary.name} height={38} src={`/${selectedLibrary.image}`} width={38} />
        <p className={classes.libraryName} data-id={selectedLibrary.id.toUpperCase()}>{selectedLibrary.name}</p>
      </Button>
      <Menu
        anchorEl={libraryMenuAnchor}
        id='library-menu'
        MenuListProps={{
          'aria-labelledby': 'library-menu-button'
        }}
        open={!!libraryMenuAnchor}
        onClose={() => setLibraryMenuAnchor(null)}
      >
        {buildMenuOptions()}
      </Menu>
    </div>
  );
};

export default LibraryMenu;
