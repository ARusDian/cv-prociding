import React from 'react'
import "../../css/dashboard_admin.css";
import { Link } from '@inertiajs/inertia-react';
// import route from 'ziggy-js';
// import "../../css/app.css"

interface Props {
  redirectTo: string
  headerTitle?: string
}

const DashboardAdminLayoutCSS = ({ redirectTo, headerTitle }: Props) => {

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link href={redirectTo}><button className='back-button'>{"< Dashboard"}</button></Link>
          <p style={{fontWeight: "bold"}}>{headerTitle && headerTitle}</p>
        </div>
      </nav>
    </div>
  )
}

export default DashboardAdminLayoutCSS