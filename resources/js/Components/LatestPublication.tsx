import React from 'react'

interface Props {
  imgSrc: string,
  linkTo: string,
}

// backup https://edit.org/images/cat/book-covers-big-2019101610.jpg

const LatestPublication = ({ imgSrc, linkTo }: Props) => {
  return (
    <>
      <div className="w-[50%] flex flex-col items-center gap-4">
        <div className='w-[70%] h-full'>
          <img src={imgSrc} alt="" className='object-contain w-full h-[700px] rounded-lg' />
        </div>
        <a href={linkTo} target='_blank' className='bg-[#FFA500] px-4 py-2 text-xl font-black rounded-full hover:opacity-90 transition-all ease-out duration-300'>Access to Conference Paper Proceeding</a>
      </div>
    </>
  )
}

export default LatestPublication