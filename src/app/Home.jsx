import React from 'react';
import Header from '../assets/component/Header';
import TenantApps from '../assets/component/TenantApp';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <>
    <Helmet>
      <title>Apps | Apps Directory</title>
    </Helmet>
    <Header />
    <TenantApps />
    </>
  )
}

export default Home