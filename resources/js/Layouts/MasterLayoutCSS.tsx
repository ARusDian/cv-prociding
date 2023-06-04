import React, { useEffect } from 'react'
import "../../css/master_layout.css";
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { asset } from '@/Models/Helper';
import "../../css/app.css"

interface Props {
  children: React.ReactNode
  active: string
}
// window.location.reload();

{/* <>
  <Head>
    <title>CV - Prociding</title>
    <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
  </Head>
  <div>
    <nav id='navbar' className='z-50'>
      <div className="nav-wrapper font-roboto text-center" style={{ color: "white" }}>
        <InertiaLink href="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
          <div className="image h-[10%]">
            <img src={asset('root', 'assets/images/logo-transparent-clean.png')} alt="logo" className='h-12' />
          </div>
        </InertiaLink>
        <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
          <InertiaLink className={'link-button ' + (activeState === "home" && "active")} href={"/"}>Home</InertiaLink>
          <InertiaLink className={'link-button ' + (activeState === "proc" && "active")} href={route("proc.index")} >Program Committe</InertiaLink>
          <InertiaLink className={'link-button ' + (activeState === "pub" && "active")} href={route("pub.index")} >Publication Opportunity</InertiaLink>
          <InertiaLink className={'link-button ' + (activeState === "sci-rev" && "active")} href={route("sci-rev.index")} >Scientific Review</InertiaLink>
          <InertiaLink className={'link-button ' + (activeState === "sub" && "active")} href={route("sub.index")} >Submission Guideline</InertiaLink>
        </div>
      </div>
    </nav>
    <div>
      {children}
    </div>
  </div>
</> */}

const MasterLayoutCSS = ({ children, active }: Props) => {
  const [activeState, setActiveState] = React.useState(active);

  useEffect(() => {
    setActiveState(active);
  }, [activeState]);

  return (
    <>
      <Head title='CV-Prociding' />
      <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
      <div>
        <nav className='w-full fixed top-0 left-0 bg-[#FFA500] text-base'>
          <div className="w-[70%] h-[70px] m-auto flex flex-row items-center justify-between">
            <InertiaLink href="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
              <div className="image h-[10%]">
                <img src={asset('root', 'assets/images/logo-transparent-clean.png')} alt="logo" className='h-12' />
              </div>
            </InertiaLink>
            <div className='flex flex-row gap-2 font-semibold'>
              <InertiaLink className={'no-underline text-black py-2 px-[10px] text-lg link-button ' + (activeState === "home" && "active")} href={"/"}>Home</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-[10px] text-lg link-button ' + (activeState === "proc" && "active")} href={route("proc.index")} >Program Committe</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-[10px] text-lg link-button ' + (activeState === "pub" && "active")} href={route("pub.index")} >Publication Opportunity</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-[10px] text-lg link-button ' + (activeState === "sci-rev" && "active")} href={route("sci-rev.index")} >Scientific Review</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-[10px] text-lg link-button ' + (activeState === "sub" && "active")} href={route("sub.index")} >Submission Guideline</InertiaLink>
            </div>
          </div>
        </nav>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default MasterLayoutCSS