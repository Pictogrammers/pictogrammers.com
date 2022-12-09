import { Fragment, FunctionComponent } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = {
  children: React.ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;