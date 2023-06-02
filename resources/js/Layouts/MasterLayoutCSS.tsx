import React, { useEffect } from 'react'
import "../../css/master_layout.css";
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { asset } from '@/Models/Helper';

interface Props {
  children: React.ReactNode
  active: string
}
// window.location.reload();

const MasterLayoutCSS = ({ children, active }: Props) => {
  const [activeState, setActiveState] = React.useState(active);

  useEffect(() => {
    setActiveState(active);
  }, [activeState]);

  return (
    <>
      <Head>
        <title>CV - Prociding</title>
        <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
      </Head>
      <div>
        <nav id='navbar' className='z-50'>
          <div className="nav-wrapper font-roboto text-center" style={{ color: "white" }}>
            <InertiaLink href="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
              <div className="h-[10%]">
                <img src={asset('root', 'assets/images/logo-transparent-clean.png')} alt="logo" className='h-12' />
              </div>
            </InertiaLink>
            <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
              <a className={'link-button ' + (activeState === "home" && "active")} href={"/"}>Home</a>
              <a className={'link-button ' + (activeState === "proc" && "active")} href={route("proc.index")} >Program Committe</a>
              <a className={'link-button ' + (activeState === "pub" && "active")} href={route("pub.index")} >Publication Opportunity</a>
              <a className={'link-button ' + (activeState === "sci-rev" && "active")} href={route("sci-rev.index")} >Scientific Review</a>
              <a className={'link-button ' + (activeState === "sub" && "active")} href={route("sub.index")} >Submission Guideline</a>
            </div>
          </div>
        </nav>
        <div className={"" + ((activeState !== "home") && "container")}>
          {children}
        </div>
      </div>
    </>
  )
}

export default MasterLayoutCSS