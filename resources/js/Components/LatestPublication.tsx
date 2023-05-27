import React from 'react'

const LatestPublication = () => {
  return (
    <>
      <h1 className='text-center font-bold text-4xl uppercase mb-4'>Latest Publication of Participant</h1>
      <div className="flex flex-row justify-around items-center gap-4">
        <div className="w-[50%] flex flex-col items-center gap-4">
          <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="" className='object-contain w-full h-[700px]' />
          <a href='#' className='bg-[#FFA500] px-4 py-2 text-lg font-semibold rounded-full hover:opacity-90 transition-all ease-out duration-300'>Access to Conference Paper Proceeding</a>
        </div>
        <div className="w-[50%] flex flex-col items-center gap-4">
          <a href="">
            <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="" className='object-contain w-full h-[700px]' />
          </a>
          <a href='#' className='bg-[#FFA500] px-4 py-2 text-lg font-semibold rounded-full hover:opacity-90 transition-all ease-out duration-300'>Download Abstract Book</a>
        </div>
      </div>
    </>
  )
}

export default LatestPublication