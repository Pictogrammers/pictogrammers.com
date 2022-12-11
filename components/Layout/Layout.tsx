import { FunctionComponent } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = {
  children: React.ReactNode;
  className?: string;
}

const Layout: FunctionComponent<Props> = ({ children, className }: Props) => {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;