import { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { useAnalytics } from 'use-analytics';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiDownload, mdiFilePngBox, mdiSvg } from '@mdi/js';
import { siAndroid, siWindows } from 'simple-icons';

import { IconLibrary, IconLibraryIcon } from '@/interfaces/icons';

import classes from './IconDownloadMenu.module.scss';

interface IconDownloadMenuMenuProps {
  icon: IconLibraryIcon;
  library: IconLibrary;
  setCustomizing: Function;
};

const IconDownloadMenu: FunctionComponent<IconDownloadMenuMenuProps> = ({ icon, library, setCustomizing }) => {
  const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);
  const [ pngDownloadOption, setPngDownloadOption ] = useState('');
  const { track } = useAnalytics();

  useEffect(() => {
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 ${library.gridSize} ${library.gridSize}"><path d="${icon.p}" /></svg>`;
    const svgUrl = URL.createObjectURL(new Blob([svgCode], { type: 'image/svg+xml' }));
    const svgImage = document.createElement('img');
    svgImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(svgImage, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setPngDownloadOption(imageData);
      canvas.remove();
      URL.revokeObjectURL(svgUrl);
      svgImage.remove();
    };
    svgImage.src = svgUrl;
  }, [ icon.p, library.gridSize ]);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const downloadSvg = () => {
    const code = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${library.gridSize} ${library.gridSize}"><path d="${icon.p}" /></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(code)}`;
  };

  const downloadXamlCanvas = () => {
    const code = `<Canvas xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" Width="${library.gridSize}" Height="${library.gridSize}"><Path Fill="#000000" Data="${icon.p}" /></Canvas>`;
    return `data:application/xaml+xml;charset=utf-8,${encodeURIComponent(code)}`;
  };

  const downloadXamlDrawImage = () => {
    const code = `<DrawingImage xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"><DrawingImage.Drawing><GeometryDrawing Brush="#000000" Geometry="${icon.p}" /></DrawingImage.Drawing></DrawingImage>`;
    return `data:application/xaml+xml;charset=utf-8,${encodeURIComponent(code)}`;
  };

  const downloadXmlVectorDrawable = () => {
    const code = `<!-- drawable/${icon.n.replaceAll('-', '_')}.xml --><vector xmlns:android="http://schemas.android.com/apk/res/android" android:height="${library.gridSize}dp" android:width="${library.gridSize}dp" android:viewportWidth="${library.gridSize}" android:viewportHeight="${library.gridSize}"><path android:fillColor="#000000" android:pathData="${icon.p}" /></vector>`;
    return `data:application/xml;charset=utf-8,${encodeURIComponent(code)}`;
  };

  const buildMenuOptions = () => {
    return [
      <ListSubheader classes={{ root: classes.header }} key='vector'>Vector Formats</ListSubheader>,
      <MenuItem
        component='a'
        download={`${icon.n}\.svg`}
        href={downloadSvg()}
        key='svg'
        onClick={() => track('downloadSVG', { icon: icon.n, library: library.name })}
      >
        <ListItemIcon><Icon path={mdiSvg} size={1} /></ListItemIcon>
        <ListItemText>Download SVG</ListItemText>
      </MenuItem>,
      <MenuItem
        component='a'
        download={`${icon.n.replaceAll('-', '_')}\.xml`}
        href={downloadXmlVectorDrawable()}
        key='xml'
        onClick={() => track('downloadXML', { icon: icon.n, library: library.name })}
      >
        <ListItemIcon sx={{ marginLeft: '3px', marginRight: '-3px' }}><Icon path={siAndroid.path} size={.8} /></ListItemIcon>
        <ListItemText>Download XML Vector Drawable for Android</ListItemText>
      </MenuItem>,
      <MenuItem
        component='a'
        download={`${icon.n}\.xaml`}
        href={downloadXamlCanvas()}
        key='xaml-canvas'
        onClick={() => track('downloadXAML', { icon: icon.n, library: library.name, type: 'canvas' })}
      >
        <ListItemIcon sx={{ marginLeft: '4px', marginRight: '-4px' }}><Icon path={siWindows.path} size={.7} /></ListItemIcon>
        <ListItemText>Download XAML (Canvas) for Windows</ListItemText>
      </MenuItem>,
      <MenuItem
        component='a'
        download={`${icon.n}\.xaml`}
        href={downloadXamlDrawImage()}
        key='xaml-drawimage'
        onClick={() => track('downloadXAML', { icon: icon.n, library: library.name, type: 'drawimage' })}
      >
        <ListItemIcon sx={{ marginLeft: '4px', marginRight: '-4px' }}><Icon path={siWindows.path} size={.7} /></ListItemIcon>
        <ListItemText>Download XAML (DrawImage) for Windows</ListItemText>
      </MenuItem>,
      <ListSubheader classes={{ root: classes.header }} key='raster'>Raster Formats</ListSubheader>,
      <MenuItem
        component='a'
        disabled={pngDownloadOption === ''}
        download={`${icon.n}\.png`}
        href={pngDownloadOption}
        key='png'
        onClick={() => track('downloadPNG', { color: '#000000', icon: icon.n, library: library.name, size: 256 })}
      >
        <ListItemIcon><Icon path={mdiFilePngBox} size={1} /></ListItemIcon>
        <ListItemText>Download PNG (256x256)</ListItemText>
      </MenuItem>,
      <MenuItem
        key='png-custom'
        onClick={() => {
          setCustomizing(true);
          track('advancedPNGExport', { icon: icon.n, library: library.name });
        }}
      >
        <ListItemIcon><Icon path={mdiFilePngBox} size={1} /></ListItemIcon>
        <ListItemText>Advanced PNG Export...</ListItemText>
      </MenuItem>
    ];
  };

  return (
    <div className={classes.root}>
      <ButtonGroup>
        <Tooltip arrow placement='top' title='Download SVG'>
          <Button
            download={`${icon.n}\.svg`}
            href={downloadSvg()}
            onClick={() => track('downloadSVG', { icon: icon.n, library: library.name })}
            sx={{ borderRadius: '4px 0 0 4px' }}
            variant='contained'
          >
            <Icon path={mdiDownload} size={1} />
          </Button>
        </Tooltip>
        <Tooltip arrow placement='top' title='Advanced Download'>
          <Button
            aria-controls={!!menuAnchor ? 'download-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={!!menuAnchor ? 'true' : undefined}
            aria-label='Advanced Download'
            disableRipple
            id='download-menu-button'
            onClick={handleMenuClick}
            sx={{
              borderLeft: '1px solid hsl(var(--white) / 25%)',
              borderRadius: '0 4px 4px 0',
              padding: '0 .5rem'
            }}
            variant='contained'
          >
            <Icon path={mdiChevronDown} size={1} />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Menu
        anchorEl={menuAnchor}
        classes={{ list: classes.menu }}
        id='download-menu'
        MenuListProps={{
          'aria-labelledby': 'download-menu-button'
        }}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuList
          dense
          sx={{ padding: 0 }}
        >{buildMenuOptions()}</MenuList>
      </Menu>
    </div>
  );
};

export default IconDownloadMenu;
