import { Fragment, FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { VirtuosoGrid } from 'react-virtuoso';
import Dialog from '@mui/material/Dialog';
import Icon from '@mdi/react';

import useCategories, { CategoryProps } from '../../hooks/useCategories';
import useWindowSize from '../../hooks/useWindowSize';

import { viewModes } from '../IconLibrary/LibraryViewMode';
import IconView from '../IconView/IconView';

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

  const handleIconModalOpen = (e: MouseEvent<HTMLAnchorElement>, icon: IconLibraryIcon) => {
    e.preventDefault();
  
    const cats = icon.t.map((tag) => categories.find((cat) => cat.id === Number(tag)));
    if (cats) {
      icon.categories = cats as CategoryProps[];
    }
    setIconModal(icon);

    if (updateUrl) {
      router.push(`/library/${library.id}/icon/${icon.n}`, undefined, { shallow: true });
    }
  };

  const handleIconModalClose = () => {
    setIconModal(null);
    if (updateUrl) {
      router.push(`/library/${library.id}`, undefined, { shallow: true });
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
            href={`/library/${library.id}/icon/${icon.n}`}
            onClick={(e) => handleIconModalOpen(e, icon)}
          >
            <Icon path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} />
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