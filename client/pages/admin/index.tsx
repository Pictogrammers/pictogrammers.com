import { NextPage } from 'next';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Head from '@/components/Head/Head';
import AdminLayout from '@/components/AdminLayout/AdminLayout';

const AdminLandingPage: NextPage = () => {
  return (
    <AdminLayout>
      <Head noIndex title='Admin'></Head>
      <Alert severity='info'>
        <AlertTitle>The Administration Portal is a work-in-progress.</AlertTitle>
        <p>We&apos;re busy rewriting the administration portal for the new website. As we complete certain aspects, they&apos;ll begin to appear here. In the meantime, if there is something you are looking for from the old site, <a href='https://dev.materialdesignicons.com/admin'>you can still access it</a>.</p>
      </Alert>
    </AdminLayout>
  );
};

export default AdminLandingPage;
