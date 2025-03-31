import React from 'react';
import Header from '../assets/component/Header';
import TenantApps from '../assets/component/TenantApp';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <>
    <Helmet>
      <title>Web Apps | Website Directory</title>
      <meta name='description' content='View the directory overview and latest updates.' />
    </Helmet>
    <Header />
    <TenantApps />
    </>
  )
}

export default Home