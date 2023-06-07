import React from 'react'

interface Props {
  imgSrc: string,
  linkTo: string,
}

// backup https://edit.org/images/cat/book-covers-big-2019101610.jpg

const LatestPublication = ({ imgSrc, linkTo }: Props) => {
  return (
    <>
      <div className="w-full xl:w-[40%] flex flex-col items-center gap-4">
        <div className='w-[330px] xl:w-fit h-[500px] xl:h-[640px]'>
          <img src={imgSrc} alt="" className='object-contain w-full h-full rounded-lg' />
        </div>
        <a href={linkTo} target='_blank' className='bg-[#FFA500] px-4 py-2 text-sm xl:text-xl font-black rounded-full hover:opacity-90 transition-all ease-out duration-300 break-words text-center'>Access to Conference Paper Proceeding</a>
      </div>
    </>
  )
}

export default LatestPublication