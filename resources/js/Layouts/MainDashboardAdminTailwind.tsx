import React from "react";
import { Link } from "@inertiajs/inertia-react";
import "../../css/app.css"
import route from "ziggy-js";

interface Props {
  children: React.ReactNode
}


const DashboardAdminTailwind = ({ children }: Props) => {
  document.body.classList.add("bg-[#f0f0f0]");
  return (
    <>
      <div className="fixed top-0 left-0 flex flex-row items-center w-full bg-[#FFA500] h-16 z-10 shadow-sm">
        <div className="ml-4 text-2xl font-roboto font-bold w-64">
          <p className="ml-3">
            <Link href="/dashboard">
              CV-Providing
            </Link>
          </p>
        </div>
      </div>
      <div className="fixed top-0 left-0 h-screen flex justify-center w-64 bg-[#FFA500] Z-0">
        <div className="mt-20 w-11/12">
          <ul className="flex flex-col gap-6 font-roboto">
            <Link href={route("proc.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Program Committe</Link>
            <Link href={route("pub.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Publication Opportunity</Link>
            <Link href={route("sci-rev.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Scientific Review</Link>
            <Link href={route("sub.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Submission Guideline</Link>
            {/* <Link href={route("pub.home")} className="px-5 py-2 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">Users</Link> */}
            <hr className="border-1 border-black" />
            <Link href="/logout" method="POST" className="flex flex-row gap-2 px-2 py-3 rounded-xl bg-[#FFD27F] hover:bg-[#FFBB3F]">
              <span><svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path>
              </svg></span> Logout
            </Link>
          </ul>
        </div>
      </div>
      <div className="mt-16 ml-64 p-4">
        {children}
      </div>
    </>
  );
}

export default DashboardAdminTailwind;