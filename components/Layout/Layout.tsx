import { FunctionComponent, ReactNode } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;