import React, { PropsWithChildren } from 'react';

import AuthenticationCardLogo from '@/Components/Jetstream/AuthenticationCardLogo';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import { asset } from '@/Models/Helper';
import route from 'ziggy-js';
import "../../../css/app.css";

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {

  // const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen w-screen">
      <div className="w-[700px] h-[700px] bg-white rounded-lg p-4 shadow-lg flex flex-col items-center justify-center gap-10">
        <div>
          <img src={asset('root', 'assets/images/icon_logo.png')} alt="" className='w-20' />
        </div>
        <p className='text-2xl font-semibold'>
          ICIEP - CV Prociding
        </p>
        <div className='w-3/4'>
          {children}
        </div>
      </div>
    </div>
    // <div className="flex bg-gray-100">
    //   <div
    //     className="mx-0 lg:mx-auto py-20 lg:my-4 w-screen lg:w-1/2 h-full lg:h-screen px-10 flex flex-col gap-2 sm:justify-center items-center p-6 sm:pt-0 "
    //   >
    //     <div className="py-5 w-full md:w-3/4 lg:mt-0 bg-white shadow-lg border   px-8 h-[500px] flex flex-col justify-center">
    //       <div className="mx-auto">
    //         dawd
    //       </div>
    //       <div className='flex flex-col text-black'>
    //         <div className='text-2xl m-auto font-semibold'>
    //           ICIEP - CV Prociding
    //         </div>
    //       </div>
    //       <div className="mt-6 py-4 sm:rounded-lg ">
    //         {children}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
