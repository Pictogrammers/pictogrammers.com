import { Fragment, FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import { VirtuosoGrid } from 'react-virtuoso';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';

import useCategories, { CategoryProps } from '@/hooks/useCategories';
import useWindowSize from '@/hooks/useWindowSize';

import Link from '@/components/Link/Link';
import { viewModes } from '@/components/IconLibrary/LibraryViewMode';
import IconView from '@/components/IconView/IconView';
import CustomGridIcon from '@/components/CustomGridIcon/CustomGridIcon';
import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper';

import { IconLibrary, IconLibraryIcon } from '@/interfaces/icons';

import classes from './IconGrid.module.scss';

interface IconGridProps {
  icons: any;
  library: IconLibrary;
  modalHook?: Function;
  updateUrl?: boolean;
  viewMode: string;
}

const IconGrid: FunctionComponent<IconGridProps> = ({ icons, library, modalHook, updateUrl = true, viewMode }) => {
  const [ iconModal, setIconModal ] = useState<IconLibraryIcon | null>(null);
  const categories = useCategories(library.id);
  const router = useRouter();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width > 0 && windowSize.width <= parseInt(classes['mobile-width']);

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
    modalHook?.();

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
        components={{
          ScrollSeekPlaceholder: () => (
            <div className={cx(classes.libraryIcon, classes.iconLoading)}>
              <Skeleton height={viewModes[viewMode as keyof typeof viewModes].iconSize * 40} width={viewModes[viewMode as keyof typeof viewModes].iconSize * 24} />
              {viewMode !== 'compact' && <Skeleton height={24} width={100} />}
            </div>
          )
        }}
        data={icons}
        listClassName={cx(classes.library, classes[viewMode])}
        itemContent={(index, icon: IconLibraryIcon) => (
          <ConditionalWrapper
            condition={!!icon.d}
            wrapper={(children: any) => (
              <Tooltip arrow placement='top' title={<Fragment><strong>Icon Deprecated</strong><br/>Click for more info</Fragment>}>
                {children}
              </Tooltip>
            )}
          >
            <Link
              className={cx(classes.libraryIcon, {
                [classes.deprecated]: !!icon.d
              })}
              disableRouter
              href={`/library/${library.id}/icon/${icon.n}`}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => handleIconModalOpen(e, icon)}
              title={!icon.d ? icon.n : undefined}
            >
              <CustomGridIcon gridSize={library.gridSize} path={icon.p} size={viewModes[viewMode as keyof typeof viewModes].iconSize} title={icon.n} />
              <p>{icon.n}</p>
            </Link>
          </ConditionalWrapper>
        )}
        overscan={1000}
        scrollSeekConfiguration={{
          enter: (velocity) => Math.abs(velocity) > 1000,
          exit: (velocity) => Math.abs(velocity) < 30
        }}
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