import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MDIWelcome from '@/components/MDIWelcome/MDIWelcome';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, className }) => {
  // Temporary welcome from the old MDI site
  const router = useRouter();
  const [ showMDIWelcome, setShowMDIWelcome ] = useState(false);
  useEffect(() => {
    if ('welcome' in router?.query) {
      setShowMDIWelcome(true);
      router.replace(`${window.location.origin}${window.location.pathname}`);
    }
  }, [ router ]);

  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
      {showMDIWelcome && <MDIWelcome handleClose={setShowMDIWelcome} />}
    </div>
  );
};

export default Layout;