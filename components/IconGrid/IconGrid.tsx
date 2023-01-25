import { Fragment, FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import { VirtuosoGrid } from 'react-virtuoso';
import Dialog from '@mui/material/Dialog';

import useCategories, { CategoryProps } from '../../hooks/useCategories';
import useWindowSize from '../../hooks/useWindowSize';

import Link from '../Link/Link';
import { viewModes } from '../IconLibrary/LibraryViewMode';
import IconView from '../IconView/IconView';
import CustomGridIcon from '../CustomGridIcon/CustomGridIcon';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import classes from './IconGrid.module.scss';

interface IconGridProps {
  icons: any;
  library: IconLibrary;
  updateUrl?: boolean;
  viewMode: string;
}

const IconGrid: FunctionComponent<IconGridProps> = ({ icons, library, updateUrl = true, viewMode }) => {
  const [ iconModal, setIconModal ] = useState<IconLibraryIcon | null>(null);
  const categories = useCategories(library.id);
  const router = useRouter();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  useEffect(() => {
    const handleRouteChange = (url: string) => {

      if (url === `/library/${library.id}/`) {
        setIconModal(null);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [ library.id, router ]);

  const handleIconModalOpen = async (e: MouseEvent<HTMLAnchorElement>, icon: IconLibraryIcon) => {
    e.preventDefault();
  
    const cats = icon.t.map((tag) => categories.find((cat) => cat.id === Number(tag)));
    if (cats) {
      icon.categories = cats as CategoryProps[];
    }
    setIconModal(icon);

    if (updateUrl) {
      await router.push(`/library/${library.id}/icon/${icon.n}`, undefined, { shallow: true });
    }
  };

  const handleIconModalClose = async () => {
    setIconModal(null);
    if (updateUrl) {
      await router.push(`/library/${library.id}`, undefined, { shallow: true });
    }
  };

  return (
    <Fragment>
      <VirtuosoGrid
        data={icons}
        listClassName={cx(classes.library, classes[viewMode])}
        itemContent={(index, icon: IconLibraryIcon) => (
          <Link
            className={classes.libraryIcon}
            disableRouter
            href={`/library/${library.id}/icon/${icon.n}`}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => handleIconModalOpen(e, icon)}
          >
            <CustomGridIcon gridSize={library.gridSize} path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} title={icon.n} />
            <p>{icon.n}</p>
          </Link>
        )}
        totalCount={icons.length}
        useWindowScroll
      />
      {!!iconModal && (
        <Dialog
          fullScreen={isMobileWidth}
          fullWidth
          maxWidth={'lg'}
          open
          onClose={handleIconModalClose}
        >
          <IconView icon={iconModal} libraryInfo={library} onClose={handleIconModalClose} />
        </Dialog>
      )}
    </Fragment>
  );
};

export default IconGrid;