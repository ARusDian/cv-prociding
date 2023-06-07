import React, { useEffect } from 'react'
import "../../css/master_layout.css";
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { asset } from '@/Models/Helper';
import "../../css/app.css"

interface Props {
  children: React.ReactNode
  title: string
  active: string
}
// window.location.reload();
const MasterLayoutCSS = ({ children, active, title }: Props) => {
  const [navbarDropdownOpen, setNavbarDropdownOpen] = React.useState(false);
  // let actived = () => {
  //   if (active === "proc") {
  //     return "Program Committe";
  //   } else if (active === "pub") {
  //     return "Publication Opportunity";
  //   } else if (active === "sci-rev") {
  //     return "Scientific Review";
  //   } else if (active === "sub") {
  //     return "Submission";
  //   }
  // }
  const screenTitle = active === "proc" ? "Program Committee" : active === "pub" ? "Publication Opportunity" : active === "sci-rev" ? "Scientific Review Team" : active === "sub" ? "Submission Guideline" : "";


  return (
    <>
      <Head title={`${title ?? ""} | ICIEP`}>
        <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
      </Head>
      <div className='z-50'>
        <nav className='w-full fixed top-0 left-0 bg-[#FFA500] text-base'>
          <div className="w-[70%] lg:w-[80%] h-[60px] m-auto flex flex-row items-center justify-between">
            <InertiaLink href="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
              <div className="image h-11 flex flex-col justify-center">
                <img src={asset('root', 'assets/images/logo-transparent-clean.png')} alt="logo" className='h-full' />
              </div>
            </InertiaLink>
            <div className="flex flex-col h-full justify-center pr-3 lg:hidden" onClick={() => setNavbarDropdownOpen(prev => !prev)}>
              <div className="space-y-2">
                <div className="w-8 h-1 bg-gray-600"></div>
                <div className="w-8 h-1 bg-gray-600"></div>
                <div className="w-8 h-1 bg-gray-600"></div>
              </div>
            </div>
            {navbarDropdownOpen && (
              <div className="absolute top-14 right-0 w-full sm:w-64 z-100  bg-[#FFA500] flex flex-col p-4 gap-5 ">
                <InertiaLink href={"/"} className='font-bold'>Home</InertiaLink>
                <InertiaLink href={route('proc.index')} className='font-bold'>Program Committe</InertiaLink>
                <InertiaLink href={route('pub.index')} className='font-bold'>Publication Opportunity</InertiaLink>
                <InertiaLink href={route('sci-rev.index')} className='font-bold'>Scientific Review</InertiaLink>
                <InertiaLink href={route('sub.index')} className='font-bold'>Submission Guideline</InertiaLink>
              </div>
            )}
            <div className='hidden lg:flex flex-row text-base font-semibold gap-1'>
              <InertiaLink className={'no-underline text-black py-2 px-2 text-center link-button ' + (active === "home" && "active")} href={"/"}>Home</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-2 text-center link-button ' + (active === "proc" && "active")} href={route("proc.index")} >Program Committe</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-2 text-center link-button ' + (active === "pub" && "active")} href={route("pub.index")} >Publication Opportunity</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-2 text-center link-button ' + (active === "sci-rev" && "active")} href={route("sci-rev.index")} >Scientific Review</InertiaLink>
              <InertiaLink className={'no-underline text-black py-2 px-2 text-center link-button ' + (active === "sub" && "active")} href={route("sub.index")} >Submission Guideline</InertiaLink>
            </div>
          </div>
        </nav>
      </div>
      <div className='-z-10 mt-[60px]'>
        {active !== "home" && (
          <h1 className='text-black pt-6 text-3xl md:text-4xl font-bold text-center mx-auto pb-4 px-4 border-b-2 border-b-black w-fit'>
            {screenTitle}
          </h1>
        )}
        {children}
      </div>
    </>
  )
}

export default MasterLayoutCSS