import React from 'react'
import "../../css/app.css";

interface Props {
  children: React.ReactNode
  active: string,
}

const MasterLayoutTailwind = ({ children, active }: Props) => {
  return (
    <div> 
      <nav className='w-full bg-[#FFA500] text-[16px] font-roboto'>
        <div className="w-[70%] h-[65px] m-auto flex flex-row items-center justify-between">

        </div>
      </nav>
    </div>
  )
}

export default MasterLayoutTailwind