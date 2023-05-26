import React from 'react'
import "../../css/master_layout.css";
import { Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';

interface Props {
  children: React.ReactNode
}

const MasterLayoutCSS = ({ children }: Props) => {
  return (
    <div>
      <nav id='navbar'>
        <div className="nav-wrapper" style={{ color: "white" }}>
          <Link href="/home" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>CV-Prociding</Link>
          <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
            <Link className='link-button' href={route("proc.index")} >Program Committe</Link>
            <Link className='link-button' href={route("pub.index")} >Publication Opportunity</Link>
            <Link className='link-button' href={route("sci-rev.index")} >Scientific Review</Link>
            <Link className='link-button' href={route("sub.index")} >Submission Guideline</Link>
          </div>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default MasterLayoutCSS