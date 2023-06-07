import React from "react";
import { Head, InertiaLink } from "@inertiajs/inertia-react";
import "../../css/app.css"
import route from "ziggy-js";
import { asset } from "@/Models/Helper";

interface Props {
  children: React.ReactNode
}


const DashboardAdminTailwind = ({ children }: Props) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [navbarDropdownOpen, setNavbarDropdownOpen] = React.useState(false);
  const HamburgerMenu = () => (
    <div className="absolute overflow-y-scroll w-screen h-fit bg-[#77B8A3] z-100 top-[70px] right-0 pt-5 pb-5 rounded-b-lg">
      <ul className='flex flex-col gap-2 w-full font-roboto px-2 font-semibold'>
        <InertiaLink href={route("dashboard")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Dashboard</InertiaLink>
        <div className="px-5 py-2 rounded-xl hover:bg-[#FFA500] cursor-pointer" onClick={() => setDropdownOpen(prev => !prev)}>
          <div className="flex flex-row justify-between items-center">
            <p>Home Content</p>
            <div className="w-6 h-6">
              {dropdownOpen ?
                (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.4800000000000001"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>)
                :
                (<svg style={{ transform: "rotate(-90deg)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.4800000000000001"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>)}
            </div>
          </div>
        </div>
        {dropdownOpen && (
          <div className="flex flex-col gap-2 pl-4">
            <InertiaLink href={route("home.header.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Header</InertiaLink>
            <InertiaLink href={route("home.news.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">News</InertiaLink>
            <InertiaLink href={route("home.keynote.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Keynote</InertiaLink>
            <InertiaLink href={route("home.gallery.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Gallery</InertiaLink>
            <InertiaLink href={route("home.timeline.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Timeline</InertiaLink>
            <InertiaLink href={route("home.publication.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Publication</InertiaLink>
            <InertiaLink href={route("home.support.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Support</InertiaLink>
          </div>
        )}
        <InertiaLink href={route("proc.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Program Committe</InertiaLink>
        <InertiaLink href={route("pub.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Publication Opportunity</InertiaLink>
        <InertiaLink href={route("sci-rev.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Scientific Review</InertiaLink>
        <InertiaLink href={route("sub.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Submission Guideline</InertiaLink>
        {/* <InertiaLink href={route("pub.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Users</InertiaLink> */}
        <hr className="border-1 border-black" />
        <InertiaLink href={route("home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Home</InertiaLink>
        <form action="/logout" method="POST" className="flex flex-row gap-2 px-4 py-3 rounded-xl hover:bg-[#FFBB3F] text-whit">
          <span><svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path>
          </svg></span> Logout
        </form>
      </ul>
    </div>
  );
  document.body.classList.add("bg-[#f0f0f0]");

  return (
    <>
      <Head>
        <title>ICIEP - Dahsboard</title>
        <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
      </Head>
      <div>
        <div className="hidden fixed top-0 left-0 lg:flex flex-row items-center w-full bg-[#77B8A3] h-16 z-0 shadow-sm">
        </div>
        <div className="flex flex-row h-20 bg-[#77B8A3] z-20 fixed w-full lg:flex lg:flex-col lg:w-64 lg:top-0 lg:left-0 lg:h-screen  ">
          <div className="h-20 lg:h-16 flex flex-col justify-center items-start w-full px-5">
            <InertiaLink href="/dashboard">
              <img src={asset('root', 'assets/images/logo-transparent-clean.png')} alt="logo" className="h-12" />
            </InertiaLink>
          </div>
          <div className="lg:mt-4 lg:w-11/12 lg:mx-auto text-white">
            {navbarDropdownOpen && <HamburgerMenu />}
            <div className="flex flex-col h-full justify-center pr-3 lg:hidden" onClick={() => setNavbarDropdownOpen(prev => !prev)}>
              <div className="space-y-2">
                <div className="w-8 h-1 bg-gray-600"></div>
                <div className="w-8 h-1 bg-gray-600"></div>
                <div className="w-8 h-1 bg-gray-600"></div>
              </div>
            </div>
            <ul className={`hidden lg:flex lg:flex-col lg:gap-2 w-full font-roboto`}>
              <InertiaLink href={route("dashboard")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Dashboard</InertiaLink>
              <div className="px-5 py-2 rounded-xl hover:bg-[#FFA500] cursor-pointer" onClick={() => setDropdownOpen(prev => !prev)}>
                <div className="flex flex-row justify-between items-center">
                  <p>Home Content</p>
                  <div className="w-6 h-6">
                    {dropdownOpen ?
                      (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.4800000000000001"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>)
                      :
                      (<svg style={{ transform: "rotate(-90deg)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.4800000000000001"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>)}
                  </div>
                </div>
              </div>
              {dropdownOpen && (
                <div className="flex flex-col gap-2 pl-4">
                  <InertiaLink href={route("home.header.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Header</InertiaLink>
                  <InertiaLink href={route("home.news.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">News</InertiaLink>
                  <InertiaLink href={route("home.keynote.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Keynote</InertiaLink>
                  <InertiaLink href={route("home.gallery.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Gallery</InertiaLink>
                  <InertiaLink href={route("home.timeline.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Timeline</InertiaLink>
                  <InertiaLink href={route("home.publication.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Publication</InertiaLink>
                  <InertiaLink href={route("home.support.show")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Support</InertiaLink>
                </div>
              )}
              <InertiaLink href={route("proc.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Program Committe</InertiaLink>
              <InertiaLink href={route("pub.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Publication Opportunity</InertiaLink>
              <InertiaLink href={route("sci-rev.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Scientific Review</InertiaLink>
              <InertiaLink href={route("sub.home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Submission Guideline</InertiaLink>
              {/* <InertiaLink href={route("pub.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Users</InertiaLink> */}
              <hr className="border-1 border-black" />
              <InertiaLink href={route("home")} className="px-5 py-2 rounded-xl hover:bg-[#FFA500]">Home</InertiaLink>
              <form action="/logout" method="POST" className="flex flex-row gap-2 px-4 py-3 rounded-xl hover:bg-[#FFBB3F] text-black">
                <span><svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path>
                </svg></span> Logout
              </form>
            </ul>
          </div>
        </div>
        <div className="pt-24 px-4 pb-4 lg:mt-16 lg:ml-64 lg:p-4">
          {children}
        </div>
      </div>
    </>
  );
}

export default DashboardAdminTailwind;