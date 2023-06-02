import React from 'react'
import "../../css/dashboard_admin.css";
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import { asset } from '@/Models/Helper';
// import route from 'ziggy-js';
// import "../../css/app.css"

interface Props {
  redirectTo: string
  headerTitle?: string
}

const DashboardAdminLayoutCSS = ({ redirectTo, headerTitle }: Props) => {

  return (
    <>
      <Head>
        <title>CV - Prociding</title>
        <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/Icon-MBC.JPG')} />
      </Head>
      <div>
        <nav className='navbar'>
          <div className='navbar-container'>
            <InertiaLink href={redirectTo}><button className='back-button'>{"< Dashboard"}</button></InertiaLink>
            <p style={{ fontWeight: "bold" }}>{headerTitle && headerTitle}</p>
          </div>
        </nav>
      </div>
    </>
  )
}

export default DashboardAdminLayoutCSS